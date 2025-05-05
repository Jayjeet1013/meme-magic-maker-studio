
const Footer = () => {
  return (
    <footer className="w-full p-4 mt-auto border-t text-sm text-muted-foreground">
      <div className="container flex items-center justify-between">
        <p>© 2025 Meme Magic Maker Studio</p>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-meme-primary transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-meme-primary transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-meme-primary transition-colors">
            Help
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
