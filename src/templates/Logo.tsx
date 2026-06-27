import Image from 'next/image';

import { AppConfig } from '../utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? 48 : 32; // ubah ukuran sesuai kebutuhan
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';

  return (
    <span className={`inline-flex items-center text-gray-900 ${fontStyle}`}>
      {/* Ganti SVG ke gambar asset */}
      <Image
        src="/assets/images/robotic.svg"
        alt="Robotix.ID Logo"
        width={size}
        height={size}
        className="mr-2"
        priority
      />

      {/* Teks nama situs (optional, bisa dihapus kalau mau logo saja) */}
      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
