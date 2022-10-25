import Button from './components/Button/Button'
import II from './components/Item/item'

export default function App() {
  return <div className="App" >
    <Button >按钮</Button>
    <Button btnType={'danger'} onClick={() => console.log(1)} ttt={'ll'}>按钮</Button>
    <Button btnType={'warning'} disabled>按钮</Button>
    <Button btnType={'link'} disabled>按钮</Button>
    <II />
  </div>;
}

