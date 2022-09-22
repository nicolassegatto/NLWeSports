import { ImageBackground } from 'react-native';
import backgroundIMG from '../../assets/background-galaxy.png';

import { styles } from './styles';

interface Props {
    children: React.ReactNode;
}

export function Background({ children }: Props) {
  return (
    <ImageBackground source={backgroundIMG} defaultSource={backgroundIMG} style={styles.container}>
      {children}
    </ImageBackground>
  );
}