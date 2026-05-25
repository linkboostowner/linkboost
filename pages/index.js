import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.includes('wildberries.ru')) {
      alert('Пока поддерживаем только Wildberries');
      return;
    }
    const id = extractProductId(url);
    if (id) router.push(`/landing/${id}`);
    else alert('Не удалось распознать товар');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>LinkBoost – микро-лендинг для товара за минуту</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Вставьте ссылку на товар Wildberries"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '300px', marginRight: '1rem' }}
        />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}

function extractProductId(url) {
  const match = url.match(/catalog\/(\d+)\//);
  return match ? match[1] : null;
}
