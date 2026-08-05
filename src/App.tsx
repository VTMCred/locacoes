import { useState } from 'react';
import { HeaderBanner } from './components/HeaderBanner';
import { CardList } from './components/CardList';
import { FooterLinks } from './components/FooterLinks';
import { Ps5View } from './components/Ps5View';
import { BikesModal } from './components/BikesModal';
import { TermsModal } from './components/TermsModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { ModalType, PageView } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [activeModal, setActiveModal] = useState<ModalType>('none');

  if (currentPage === 'ps5') {
    return <Ps5View onBackToHome={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-700">
      {/* 1. Top Intense Blue Header Banner */}
      <HeaderBanner />

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-between">
        <div className="w-full">
          {/* Card List Section */}
          <CardList
            onSelectModal={setActiveModal}
            onSelectPage={setCurrentPage}
          />

          {/* Footer Links & Copyright */}
          <FooterLinks onSelectModal={setActiveModal} />
        </div>
      </main>

      {/* 3. Interactive Modals */}
      <BikesModal
        isOpen={activeModal === 'bikes'}
        onClose={() => setActiveModal('none')}
      />

      <TermsModal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal('none')}
      />

      <WhatsAppModal
        isOpen={activeModal === 'whatsapp'}
        onClose={() => setActiveModal('none')}
      />
    </div>
  );
}
