import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Выполняем запрос только на клиенте и только если есть id
    if (id && typeof window !== 'undefined') {
      setLoading(true);
      fetch(`/api/product?id=${id}`)
        .then(r => r.json())
        .then(data => {
          if (data.error) {
            console.error(data.error);
            setProduct(null);
          } else {
            setProduct(data);
          }
        })
        .catch(err => console.error('Ошибка загрузки:', err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Не рендерим ничего на сервере (пока идёт сборка)
  if (typeof window === 'undefined') return null;
  if (loading) return <div>Загрузка...</div>;
  if (!product) return <div>Товар не найден или произошла ошибка</div>;

  const buyUrl = `https://www.wildberries.ru/catalog/${id}/detail.aspx`;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      {product.images?.[0] && (
        <img src={product.images[0]} alt="" style={{ width: '100%' }} />
      )}
      <h2>{product.name}</h2>
      <p>⭐ {product.rating} | Отзывов: {product.feedbacks}</p>
      <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{product.price} ₽</p>
      <a
        href={buyUrl}
        target="_blank"
        rel="noopener"
        style={{
          display: 'inline-block',
          background: '#f15a29',
          color: 'white',
          padding: '1rem 2rem',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
        }}
      >
        Купить на Wildberries
      </a>
      <p style={{ marginTop: '2rem', color: '#666' }}>Создано через LinkBoost</p>
    </div>
  );
}
