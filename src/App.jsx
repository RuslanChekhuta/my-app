import CardItem from "./components/CardItem";
import GalleryGrid from "./components/GalleryGrid";

const cardsData = [
  { id: 1, title: "Card One", desc: "First card description" },
  { id: 2, title: "Card Two", desc: "Second card description" },
  { id: 3, title: "Card Three", desc: "Third card description" },
];

const galleryImages = [
  "https://picsum.photos/id/10/400/300",
  "https://picsum.photos/id/20/400/300",
  "https://picsum.photos/id/30/400/300",
  "https://picsum.photos/id/40/400/300",
  "https://picsum.photos/id/50/400/300",
  "https://picsum.photos/id/60/400/300",
  "https://picsum.photos/id/50/400/300",
  "https://picsum.photos/id/60/400/300",
  "https://picsum.photos/id/70/400/300",
  "https://picsum.photos/id/80/400/300",
  "https://picsum.photos/id/90/400/300",
  "https://picsum.photos/id/100/400/300",
  "https://picsum.photos/id/110/400/300",
];

function App() {
  return (
    <div>
      <h1 className="my-5 font-bold text-blue-900 text-4xl text-center">
        Tailwind Demo
      </h1>

      <div className="flex md:flex-row flex-col justify-center gap-6 mb-10">
        {cardsData.map((card) => (
          <CardItem key={card.id} title={card.title} description={card.desc} />
        ))}
      </div>

      <GalleryGrid items={galleryImages} />
    </div>
  );
}

export default App;
