import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

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
    const data = useAuth();
    console.log(data);
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
                    />

                    <SignInSocialButton 
                        title="Entrar com o Google"
                        svg={AppleSvg}
                    />
                </FooterWrapper>
            </Footer>

        </Container>
    )
}