import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DiagnosticActions from '~/store/ducks/diagnostics';

import DiagnosticCard from '~/components/DiagnosticCard';

import {
  ContainerSafe,
  TopBar,
  ContainerHeader,
  TextHeader,
  ContainerEmpty,
  TextEmpty,
  BaseIcon,
  DiagnosticList,
} from './styles';

class RecordList extends PureComponent {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="playlist-check" size={30} color={tintColor} />
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    getAllDiagnosticsRequest: PropTypes.func.isRequired,
    deleteDiagnosticRequest: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
    remoteData: [],
    selected: new Map(),
  };

  async componentDidMount() {
    await this.getDiagnosticsItems();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { remoteData } = prevState;
    const { allDiagnostics } = nextProps;
    if (remoteData !== allDiagnostics) {
      return {
        remoteData: allDiagnostics.filter((item) => item.image !== null),
        loading: false,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  getDiagnosticsItems = async () => {
    const { getAllDiagnosticsRequest } = this.props;

    await this.setState({ selected: new Map(), loading: true });
    await getAllDiagnosticsRequest();
  };

  renderHeader = () => {
    const { loading } = this.state;
    if (loading) return null;
    return (
      <ContainerHeader>
        <TextHeader>Puxe para Atualizar</TextHeader>
      </ContainerHeader>
    );
  };

  renderEmpty = () => (
    <ContainerEmpty>
      <TextEmpty>Não há registros, faça a captura de imagens.</TextEmpty>
      <BaseIcon name="camera" />
    </ContainerEmpty>
  );

  handleDelete = async (id) => {
    const { deleteDiagnosticRequest } = this.props;

    await this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected, loading: true };
    });

    await deleteDiagnosticRequest({ id });
  };

  render() {
    const { remoteData, loading, selected } = this.state;

    return (
      <ContainerSafe>
        <TopBar />
        {remoteData && (
          <DiagnosticList
            data={remoteData}
            renderItem={({ item }) => (
              <DiagnosticCard
                item={item}
                onDelete={() => this.handleDelete(item.id)}
                selected={!!selected.get(item.id)}
              />
            )}
            keyExtractor={(item) => `${item.id}-card`}
            onRefresh={this.getDiagnosticsItems}
            refreshing={loading}
            ListHeaderComponent={this.renderHeader}
            ListEmptyComponent={this.renderEmpty}
            extraData={this.state}
          />
        )}
      </ContainerSafe>
    );
  }
}

const mapStateToProps = (state) => ({
  offline: state.offline,
  localDiagnostics: state.offline.queue,
  diagnostics: state.diagnostics,
  allDiagnostics: state.diagnostics.data,
  refreshing: state.diagnostics.loading,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(DiagnosticActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordList);
