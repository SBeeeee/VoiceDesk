export const Footer = () => {
  return (
    <footer className="py-12 border-t border-[#E8E3DE] bg-[#F5F3F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#e8837a] to-[#c9554c]"></div>
              <span className="font-(--font-display) text-sm">ShopVoice</span>
            </div>
            <p className="text-sm text-[#6B6560]">
              AI voice receptionist for local shops.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-[#6B6560]">
              <li><a href="#features" className="hover:text-black transition">Features</a></li>
              <li><a href="#how" className="hover:text-black transition">How it works</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-[#6B6560]">
              <li><a href="#" className="hover:text-black transition">Help Center</a></li>
              <li><a href="#" className="hover:text-black transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-[#6B6560]">
              <li><a href="#" className="hover:text-black transition">Privacy</a></li>
              <li><a href="#" className="hover:text-black transition">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-[#E8E3DE] text-center text-sm text-[#6B6560]">
          <p>&copy; 2024 ShopVoice. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};