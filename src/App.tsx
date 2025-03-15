import './App.css'
import FormPay from './components/formPay'
import ListPay from './components/listPay'

function App() {

  return (
    <>

      <div className='container bg-gray-100 mx-auto px-4 py-8 max-w-6xl'>
        <FormPay />
        <ListPay />
      </div>

    </>
  )
}

export default App
