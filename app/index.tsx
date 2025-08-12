// screens/LoginScreen.tsx
import { ThemeInput } from '@/components/ThemeInput';
import { useAuth } from '@/context/AuthProvider';
import UseLogin from '@/hooks/UseLogin';
import { useState } from 'react';
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  const [Usuario, setUsuario] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [logs, setLogs] = useState<string[]>([]); // <-- Nuevo estado para logs
  const { loading: authLoading } = useAuth();
  const { loading, handleLogin, error } = UseLogin({
    Usuario,
    Contraseña,
    onLog: (msg) => setLogs(logs => [...logs, msg]), // <-- Pasar función de log
  });

  if (authLoading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.conten}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Gane Express</Text>
        <Image
          source={require('../assets/images/logogane.webp')}
          style={{
            width: 300,
            height: 100,
            resizeMode: 'contain',
            marginTop: 20
          }}
        />

        <Text style={styles.Text}>Usuario</Text>
        <ThemeInput
          style={styles.input}
          onChangeText={text => setUsuario(text)}
          value={Usuario}
          placeholder="ingresar usuario"
        />
        <Text style={styles.Text}>Contraseña</Text>
        <ThemeInput
          style={styles.input}
          onChangeText={text => setContraseña(text)}
          value={Contraseña}
          placeholder="ingresar contraseña"
          secureTextEntry={true}
          
        />

        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.Button,
            {
              transform: pressed ? [{ scale: 0.90 }] : [{ scale: 1 }],
            }
          ]}
        >
          <Text>Iniciar sesión</Text>
        </Pressable>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {loading ? <Text style={styles.success}>Cargando...</Text> : null}

        {logs.length > 0 && (
          <View style={{ marginTop: 10, width: '90%' }}>
            <Text style={{ fontWeight: 'bold' }}>Logs:</Text>
            {logs.map((log, idx) => (
              <Text key={idx} style={{ fontSize: 12, color: '#333' }}>{log}</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '147%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conten: {
    width: '90%',
    minHeight: 380,
    backgroundColor: '#c7e0fa',
    borderWidth: 2,
    borderColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    alignSelf: 'center',
    paddingVertical: 24,
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    width: '60%',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: 'black'
  },
  Text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20
  },
  Button: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#78a8f3',
    padding: 10,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f8d7da',
  },
  success: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#d4edda',
  }
});