export default async function handler(req, res) {
  if (!req.query || !req.query.id) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Missing product id' }));
    return;
  }

  const { id } = req.query;

  try {
    const response = await fetch(
      `https://card.wb.ru/cards/v1/detail?appType=1&curr=rub&dest=-1257786&spp=30&nm=${id}`
    );
    const data = await response.json();

    if (!data?.data?.products?.length) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Товар не найден' }));
      return;
    }

    const product = data.data.products[0];
    const result = {
      name: product.name,
      price: product.salePriceU / 100,
      images: product.pics.map(
        p => `https://images.wbstatic.net/c516x688/new/${String(p).padStart(6, '0')}.jpg`
      ),
      rating: product.rating,
      feedbacks: product.feedbacks,
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Ошибка при получении данных' }));
  }
}
