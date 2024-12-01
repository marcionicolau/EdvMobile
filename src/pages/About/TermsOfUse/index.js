import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  TopBar,
  ContainerSafe,
  Title,
  Container,
  Item,
  SubItem,
} from './styles';

const TabIcon = ({ tintColor }) => (
  <Icon name="file-document-box-multiple" size={30} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const TermsOfUse = () => (
  <ContainerSafe>
    <TopBar />
    <Container>
      <Title>Termo e condições de uso</Title>

      <Item>1. Do Objeto e dos Requisitos</Item>
      <SubItem>
        1.1. Este “Termo e condições de uso” aplica-se ao uso do aplicativo
        Diagnóstico Virtual. O aplicativo é de acesso livre. Este documento
        apresenta, portanto, as condições de uso deste sistema digital.
      </SubItem>
      <SubItem>
        1.2. A aceitação deste “Termo e condições de uso” é requisito necessário
        para a utilização do aplicativo, com todas as suas funcionalidades.
        Todos os usuários são informados deste “Termo e condições de uso”, o
        qual devem ler, certificar-se de tê-lo entendido e aceitar as condições
        nele estabelecidas. Desta forma, fica claro que a utilização do
        aplicativo Diagnóstico Virtual implicará na expressa e inequívoca
        aceitação integral das condições estabelecidas no presente “Termo e
        condições de uso”.
      </SubItem>
      <SubItem>
        1.3. A Embrapa Trigo reserva-se o direito de modificar cláusulas e
        condições contidas neste “Termo e condições de uso”, a qualquer tempo,
        sem prévio aviso, por meio da atualização do mesmo. Tais modificações
        entrarão em vigor a partir de sua publicação em atualizações do
        aplicativo Diagnóstico Virtual.
      </SubItem>

      <Item>2. Exclusão de Garantias</Item>
      <SubItem>
        2.1. O usuário entende e concorda expressamente que o uso do aplicativo
        é por sua conta e risco e que os serviços são fornecidos “na forma em
        que se encontram” e “de acordo com a disponibilidade”.
      </SubItem>
      <SubItem>
        2.2. Especificamente, a Embrapa Trigo não garante que: a) O uso do
        aplicativo atenderá aos requisitos do usuário; b) O uso do aplicativo
        será ininterrupto, pontual, seguro e isento de erros; c) Qualquer
        informação obtida pelo usuário em decorrência do seu uso do aplicativo
        será precisa ou confiável; e d) Os defeitos no funcionamento ou na
        funcionalidade do aplicativo serão corrigidos.
      </SubItem>
      <SubItem>
        2.3. A Embrapa Trigo ainda se isenta expressamente de todas as
        responsabilidades, garantias ou condições de qualquer natureza, do uso
        do aplicativo para propósitos particulares dos usuários.
      </SubItem>
      <SubItem>
        2.4. A Embrapa Trigo se reserva o direito de executar manutenções
        corretivas e preventivas em seu sistema, ou mesmo de alterar ou incluir
        funcionalidades, sempre que julgar necessário, sem necessidade de aviso
        prévio.
      </SubItem>

      <Item>3. Limitação de Responsabilidade</Item>
      <SubItem>
        3.1. Sujeito à cláusula mencionada no parágrafo 2.1, o usuário entende e
        concorda que a Embrapa Trigo não será responsável perante o usuário por:
        a) Quaisquer danos diretos, indiretos, incidentais, especiais,
        consequenciais ou exemplares, incorridos pelo usuário, causados e sob
        qualquer teoria de responsabilidade. Isso incluirá, mas não se limitará
        a, qualquer perda de lucros (incorrida direta ou indiretamente pelo uso
        do aplicativo), qualquer perda de dados que o usuário possa sofrer,
        custos de aquisição de serviços relacionados ao uso do aplicativo ou
        outra perda intangível; b) Qualquer perda ou danos em que o usuário
        possa incorrer em decorrência de quaisquer alterações que a Embrapa
        Trigo possa fazer ao aplicativo, ou por qualquer cessação permanente ou
        temporária do acesso ao aplicativo; c) Qualquer perda ou danos em que o
        usuário possa incorrer em decorrência de eliminação, corrupção ou
        incapacidade de comunicação do usuário com o banco de dados da Embrapa
        Trigo; d) Qualquer perda ou danos em que o usuário possa incorrer em
        decorrência da falta de manutenção, por parte do usuário, da segurança e
        da confidencialidade dos detalhes da sua conta e senha.
      </SubItem>
      <SubItem>
        3.2. O usuário concorda que qualquer informação por ele publicada ou
        armazenada por meio deste aplicativo será de sua total responsabilidade,
        sendo vedado o uso para a prática de atos que violem qualquer lei ou
        regulamento local, estadual, nacional ou internacional que lhe seja
        aplicável.
      </SubItem>

      <Item>4. Privacidade e informações pessoais do usuário</Item>
      <SubItem>
        4.1. A Embrapa Trigo garante que as informações pessoais do usuário,
        assim como as informações do agronegócio gerido por ele e publicados por
        meio do aplicativo serão mantidas em sigilo de outros usuários, exceto
        quando autorizadas expressamente pelo próprio usuário.
      </SubItem>
      <SubItem>
        4.2. O usuário concorda com a utilização dos dados publicados por ele no
        aplicativo, pela Embrapa Trigo, para subsidiar seus projetos de
        pesquisa.
      </SubItem>
      <SubItem>
        4.3. Nenhuma informação pessoal ou particular de um usuário poderá ser
        publicada sem a prévia autorização do próprio usuário.
      </SubItem>

      <Item>5. Segurança da conta e senhas do usuário</Item>
      <SubItem>
        5.1. O usuário concorda e compreende que será responsável por manter a
        confidencialidade das senhas associadas a qualquer conta que utiliza
        para acessar o aplicativo Diagnóstico Virtual.
      </SubItem>
      <SubItem>
        5.2. Dessa forma, o usuário concorda que será o único responsável
        perante a Embrapa Trigo por todas as atividades que ocorram em sua
        respectiva conta de acesso ao Diagnóstico Virtual.
      </SubItem>
      <SubItem>
        5.3. Se tomar conhecimento de qualquer utilização não autorizada da sua
        senha ou a sua conta de acesso, o usuário concorda em notificar
        imediatamente a Embrapa Trigo por meio do mecanismo de contato da
        Unidade Embrapa Trigo em seu sítio de internet.
      </SubItem>

      <Item>6. Condições de uso do sistema </Item>
      <SubItem>
        6.1. O usuário reconhece que todo o conteúdo exibido pelo aplicativo é
        de propriedade da Embrapa e está protegido pela Lei que regulamenta
        direitos autorais, marcas, patentes e demais direitos de propriedade
        intelectual.
      </SubItem>
      <SubItem>
        6.2. O usuário cede direito de imagem das fotos enviadas por meio do
        aplicativo para a Embrapa Trigo, permitindo seu uso na melhoria do
        algoritmo do aplicativo e em outras pesquisas da Embrapa Trigo.
      </SubItem>
      <SubItem>
        6.3. O usuário cede direito de uso da localização das fotos enviadas por
        meio do aplicativo para a Embrapa Trigo, permitindo seu uso pela Embrapa
        Trigo.
      </SubItem>

      <Item>7. Da legislação e do foro</Item>
      <SubItem>
        7.1. O presente Termo e condições de uso será regido, interpretado e
        executado de acordo com as leis da República Federativa do Brasil,
        independentemente dos conflitos dessas leis com leis de outros estados
        ou países, sendo competente o Foro de Passo Fundo/RS, no Brasil, para
        dirimir qualquer dúvida decorrente deste instrumento. O usuário
        consente, expressamente, com a competência desse juízo, e renuncia,
        neste ato, à competência de qualquer outro foro, por mais privilegiado
        que seja ou venha a ser.
      </SubItem>

      <Item>
        8. Das disposições finais, da atualização deste Termo e condições de uso
        e da concordância do usuário
      </Item>
      <SubItem>
        8.1. Mesmo que qualquer parte deste Termo e condições de uso seja
        considerada inválida ou inexequível, as demais disposições permanecerão
        em pleno vigor e efeito, sendo que o referido trecho deverá ser
        interpretado de forma consistente com a lei aplicável, para refletir, na
        medida do possível, a intenção original das partes.
      </SubItem>

      <SubItem>
        8.2. Eventual falha da Embrapa Trigo em exigir quaisquer direitos ou
        disposições do presente Termo e condições de uso não constituirá
        renúncia, podendo exercer regularmente o seu direito, dentro dos prazos
        legais.
      </SubItem>
    </Container>
  </ContainerSafe>
);

TermsOfUse.navigationOptions = {
  tabBarIcon: TabIcon,
};

export default TermsOfUse;
