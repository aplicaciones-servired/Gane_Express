import { Platform, ToastAndroid } from 'react-native';

export default function Alertas(props: any) {
    return (
        <>
            {Platform.OS === 'android' && (
                ToastAndroid.showWithGravityAndOffset(
                    props,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    50,
                    50
                )
            )}
            {Platform.OS === 'web' && (
                alert(props)
            )}
        </>
    );
}
