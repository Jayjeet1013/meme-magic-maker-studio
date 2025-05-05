
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemeMaker from "@/components/MemeMaker";

const Create = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted">
        <MemeMaker />
      </main>
      <Footer />
    </div>
  );
};

export default Create;
