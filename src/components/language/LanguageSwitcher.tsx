import { useRouter } from 'next/router';
import Link from 'next/link';

const LanguageSwitcher: React.FC = () => {
  const { locale, asPath } = useRouter();

  return (
    <div>
      <Link href={asPath} locale="en-US" style={{ marginRight: '10px' }}>
        English
      </Link>
      <Link href={asPath} locale="ro-RO">
        Română
      </Link>
    </div>
  );
};
 export default  LanguageSwitcher