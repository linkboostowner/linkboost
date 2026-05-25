export default async function handler(req, res) {
  const { id } = req.query;
  const response = await fetch(`https://card.wb.ru/cards/v1/detail?appType=1&curr=rub&dest=-1257786&spp=30&nm=${id}`);
  const data = await response.json();
  if (!data?.data?.products?.length) return res.status(404).json({ error: 'Товар не найден' });

  const product = data.data.products[0];
  const result = {
    name: product.name,
    price: product.salePriceU / 100,
    images: product.pics.map(p => `https://images.wbstatic.net/c516x688/new/${String(p).padStart(6, '0')}.jpg`),
    rating: product.rating,
    feedbacks: product.feedbacks,
  };
  res.json(result);
}
