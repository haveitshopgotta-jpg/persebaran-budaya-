import React from 'react';
import { Sparkles, Heart, Scale, Users, ShieldCheck, Feather } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const values = [
    {
      title: 'Cablaka (Blakasuta)',
      subtitle: 'Kejujuran & Keterbukaan Hati',
      desc: 'Berbicara apa adanya, terus terang, tanpa kepalsuan basa-basi feodal keraton. Bagi wong Banyumas, kejujuran batin lebih mulia daripada kesopanan semu.',
      icon: Feather,
    },
    {
      title: 'Egaliter (Ora Mbedakna)',
      subtitle: 'Kesetaraan Derajat Manusia',
      desc: 'Memandang setiap manusia berderajat sama di hadapan Sang Maha Kuasa. Bahasa penginyongan dipakai tanpa hierarki kasta yang memecah persaudaraan.',
      icon: Scale,
    },
    {
      title: 'Guyub Rukun',
      subtitle: 'Solidaritas Komunal Serayu',
      desc: 'Kebersamaan warga yang kokoh dalam suka maupun duka. Mengutamakan musyawarah dan gotong royong dalam setiap hajatan dan pembangunan desa.',
      icon: Users,
    },
    {
      title: 'Bawera & Prasaja',
      subtitle: 'Kelapangan Dada & Kesederhanaan',
      desc: 'Hati yang lapang menerima takdir kehidupan dan gaya hidup bersahaja. Sikap tabah menghadapi ujian tanpa keluh kesah yang berlebihan.',
      icon: Heart,
    },
  ];

  return (
    <section id="nilai-section" className="py-16 md:py-24 bg-[#2D1B0F] text-[#FDFBF7] relative overflow-hidden">
      {/* Subtle Batik texture overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] tracking-wider uppercase mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Falsafah Budaya Penginyongan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-cinzel text-[#FDFBF7] tracking-tight">
            Jiwa & Karakter Luhur Wong Banyumas
          </h2>
          <p className="text-sm md:text-base text-[#FDFBF7]/80 mt-3 font-sans leading-relaxed">
            Di balik megahnya seni tari Ebeg, denting Calung, dan legitnya Gethuk Sokaraja, 
            terpatri falsafah hidup luhur yang membentuk karakter tangguh, jujur, 
            dan bersahaja masyarakat di tepian Sungai Serayu.
          </p>
        </div>

        {/* 4 Pillars of Banyumas Character */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-[#1F140A]/80 border border-[#D4AF37]/30 rounded-2xl p-6 transition-all hover:border-[#D4AF37] hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#801B2B]/60 border border-[#D4AF37]/40 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
                  {val.subtitle}
                </div>
                <h3 className="text-xl font-bold font-cinzel text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-[#FDFBF7]/75 leading-relaxed font-sans">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Feature Quote on Cablaka */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-[#1F140A] via-[#351F12] to-[#1F140A] border border-[#D4AF37]/40 relative">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Kearifan Leluhur Lembah Serayu
            </span>
            <blockquote className="text-lg sm:text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed">
              &ldquo;Urip iku mung mampir ngombe, lakonana kanthi blakasuta, guyub rukun, lan aja dumeh marang sapadha-padha.&rdquo;
            </blockquote>
            <p className="text-xs text-[#D4AF37]/90 pt-1">
              — Pitutur Luhur Sesepuh Adat Banyumas
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
