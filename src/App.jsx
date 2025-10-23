import React,{ useState,useEffect} from 'react'
import './App.css'
 const kitaplar = [
  { id: 1, baslik: "Sefiller", yazar: "Victor Hugo", kategori: "Klasik" },
  { id: 2, baslik: "Harry Potter ve Felsefe Taşı", yazar: "J.K. Rowling", kategori: "Fantastik" },
  { id: 3, baslik: "Simyacı", yazar: "Paulo Coelho", kategori: "Roman" },
  { id: 4, baslik: "Suç ve Ceza", yazar: "Fyodor Dostoyevski", kategori: "Klasik" },
  { id: 5, baslik: "Yüzüklerin Efendisi", yazar: "J.R.R. Tolkien", kategori: "Fantastik" },
  { id: 6, baslik: "Küçük Prens", yazar: "Antoine de Saint-Exupéry", kategori: "Roman" },
  { id: 7, baslik: "1984", yazar: "George Orwell", kategori: "Distopya" },
  { id: 8, baslik: "Brave New World", yazar: "Aldous Huxley", kategori: "Distopya" },
  { id: 9, baslik: "Fareler ve İnsanlar", yazar: "John Steinbeck", kategori: "Roman" },
  { id: 10, baslik: "Don Kişot", yazar: "Miguel de Cervantes", kategori: "Klasik" },
  { id: 11, baslik: "Hobbit", yazar: "J.R.R. Tolkien", kategori: "Fantastik" },
  { id: 12, baslik: "Anna Karenina", yazar: "Lev Tolstoy", kategori: "Klasik" },
  { id: 13, baslik: "Moby Dick", yazar: "Herman Melville", kategori: "Klasik" },
  { id: 14, baslik: "Alice Harikalar Diyarında", yazar: "Lewis Carroll", kategori: "Fantastik" },
  { id: 15, baslik: "Savaş ve Barış", yazar: "Lev Tolstoy", kategori: "Klasik" },
];
const KategoriFiltre = ({ kategori, setKategori }) => {
  return (
    <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
      <option value="">Tüm Kategoriler</option>
      <option value="Klasik">Klasik</option>
      <option value="Fantastik">Fantastik</option>
      <option value="Roman">Roman</option>
    </select>
  );
};
const AramaCubugu = ({ aramaMetni, setAramaMetni }) => {
  return (
    <input
      type="text"
      placeholder="Kitap ara..."
      value={aramaMetni}
      onChange={(e) => setAramaMetni(e.target.value)}
    />
  );
};
const KitapKartı = ({ id, baslik, yazar, kategori, favorideMi, toggleFavori }) => {
  return (
    <div style={{ border: "1px solid #ccc", margin: "5px", padding: "10px" }}>
      <h3>{baslik}</h3>
      <p>{yazar} - {kategori}</p>
      <button onClick={() => toggleFavori(id)}>
        {favorideMi ? "Çıkar" : "Favori"}
      </button>
    </div>
  );
};
const KitapListe = ({ kitaplarFiltreli, favoriler, toggleFavori }) => {
  return (
    <div>
      {kitaplarFiltreli.map((kitap) => (
        <KitapKartı
          key={kitap.id}
          {...kitap}
          favorideMi={favoriler.includes(kitap.id)}
          toggleFavori={toggleFavori}
        />
      ))}
    </div>
  );
};
const FavoriPaneli = ({ favoriler, kitaplar }) => {
  const favoriKitaplar = kitaplar.filter((k) => favoriler.includes(k.id));
  return (
    <div>
      <h4>Favoriler ({favoriler.length})</h4>
      <ul>
        {favoriKitaplar.map((k) => (
          <li key={k.id}>{k.baslik}</li>
        ))}
      </ul>
    </div>
  );
};
function App() {
  const [aramaMetni, setAramaMetni] = useState("");
  const [kategori, setKategori] = useState("");
  const [favoriler, setFavoriler] = useState([]);

  useEffect(() => {
    const kayitArama = localStorage.getItem("aramaMetni");
    const kayitFavoriler = JSON.parse(localStorage.getItem("favoriler") || "[]");
    if (kayitArama) setAramaMetni(kayitArama);
    if (kayitFavoriler) setFavoriler(kayitFavoriler);
  }, []);

  useEffect(() => {
    localStorage.setItem("aramaMetni", aramaMetni);
    localStorage.setItem("favoriler", JSON.stringify(favoriler));
  }, [aramaMetni, favoriler]);

  const toggleFavori = (id) => {
    setFavoriler((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const kitaplarFiltreli = kitaplar.filter(
    (k) =>
      k.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) &&
      (kategori ? k.kategori === kategori : true)
  );
  return (
      <div>
      <h1>Web Kitaplığı</h1>
      <AramaCubugu aramaMetni={aramaMetni} setAramaMetni={setAramaMetni} />
      <KategoriFiltre kategori={kategori} setKategori={setKategori} />
      <KitapListe
        kitaplarFiltreli={kitaplarFiltreli}
        favoriler={favoriler}
        toggleFavori={toggleFavori}
      />
      <FavoriPaneli favoriler={favoriler} kitaplar={kitaplar} />
    </div>
  );
}

export default App
