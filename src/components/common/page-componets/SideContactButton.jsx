const SideContactButton = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const contactSection = document.getElementById('contact-form');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/contact#contact-form';
      }
    }
  };

  return (
    <button
  onClick={handleClick}
  className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#b38f4f] text-white px-3 py-2 rounded-l-md shadow-lg z-50 transform -rotate-90 origin-bottom-right hover:bg-[#94723e] transition-colors"
  style={{
    transform: 'rotate(-90deg) scaleX(-1)', // This flips the text
    writingMode: 'horizontal-tb',
  }}
>
  <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>
    Schedule a Site Visit
  </span>
</button>
  );
};

export default SideContactButton;
