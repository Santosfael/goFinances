import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";

import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';
import LogoSvg from '../../assets/logo.svg';

import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from "./styles";

export function SignIn() {
    const [ isLoading, setIsLoading ] = useState(false);
    const { signInWithGoogle, signInWithApple } = useAuth();

    const theme = useTheme();

    async function handleSignWithGoogle() {
        try {
            setIsLoading(true);
            return await signInWithGoogle();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Google');
            setIsLoading(false);
        }
    }

    async function handleSignWithApple() {
        try {
            setIsLoading(true);
            return await signInWithApple();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Apple');
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça o seu login com {'\n'}
                    uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton 
                        title="Entrar com o Google"
                        svg={GoogleSvg}
                        onPress={handleSignWithGoogle}
                    />

                    { Platform.OS === 'ios' &&
                        <SignInSocialButton
                            title="Entrar com Apple"
                            svg={AppleSvg}
                            onPress={handleSignWithApple}
                        />
                    }
                </FooterWrapper>
            </Footer>

            { isLoading && 
                <ActivityIndicator
                    color={theme.colors.shape}
                    size="small"
                    style={{marginTop: 18}}
                />
            }

        </Container>
    )
}