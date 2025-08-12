import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

export type ThemeInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemeInput({
    lightColor,
    darkColor,
    style,
    ...props
}: ThemeInputProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const backgroundColor = useThemeColor({ light: '#fff', dark: '#222' }, 'background');
    const placeholderTextColor = useThemeColor(
        { light: '#888', dark: '#ccc' }, // gris oscuro para claro, gris claro para oscuro
        'text'
    );

    return (
        <TextInput
            style={[
                styles.input,
                { color, backgroundColor },
                style
            ]}
            placeholderTextColor={placeholderTextColor}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 70,
        backgroundColor: 'transparent', // <- cambio aquí
        textAlign: 'center',
    },
});
