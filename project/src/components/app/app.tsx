import MainScreen from '../main/main';


type AppScreenProps = {
  filmCardTitle: string;
  filmCardGenre: string;
  filmCardYear: number;
}

function App(props: AppScreenProps): JSX.Element {
  const {filmCardGenre} = props;
  const {filmCardTitle} = props;
  const {filmCardYear} = props;

  return <MainScreen filmCardGenre={filmCardGenre} filmCardTitle={filmCardTitle} filmCardYear={filmCardYear} />;
}

export default App;
