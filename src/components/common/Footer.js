import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 w-full py-4 text-center border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Copyright &copy; {currentYear} Todos os Direitos reservados. Template by{' '}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline dark:text-purple-300"
          >
            Fatec Cotia
          </a>.
        </p>
        <ul className="flex justify-center mt-2 space-x-4">
          <li><a href="#"><i className="fa fa-cc-visa text-lg"></i></a></li>
          <li><a href="#"><i className="fa fa-credit-card text-lg"></i></a></li>
          <li><a href="#"><i className="fa fa-cc-paypal text-lg"></i></a></li>
          <li><a href="#"><i className="fa fa-cc-mastercard text-lg"></i></a></li>
          <li><a href="#"><i className="fa fa-cc-discover text-lg"></i></a></li>
          <li><a href="#"><i className="fa fa-cc-amex text-lg"></i></a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
