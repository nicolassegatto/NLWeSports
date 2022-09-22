import React, {useState} from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native'
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {

    const [isCopping, setIsCopping] = useState(false)

    async function handleCopyDiscordToClipBoard() {
        setIsCopping(true)
        await Clipboard.setStringAsync(discord);
        Alert.alert('Discord Copiado!', 'Usuario copaiado para área de transferência.')
        setIsCopping(false)
    }

    return (
        <Modal transparent statusBarTranslucent {...rest} animationType='fade'>
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <MaterialIcons name='close' size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>

                    <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
                    <Heading title="Let's Play" subtitle='Agora é só começar a Jogar!' style={styles.cabeçalhos} />

                    <Text style={styles.label}>
                        Adicione no Discord!
                    </Text>

                    <TouchableOpacity disabled={isCopping} style={styles.discordButton} onPress={handleCopyDiscordToClipBoard}>
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord }
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}