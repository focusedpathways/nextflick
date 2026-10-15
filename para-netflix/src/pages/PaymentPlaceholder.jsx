import { Link, useLocation } from 'react-router-dom'
import LightPage from '../components/LightPage.jsx'
import './PaymentPlaceholder.css'

// Stand-in for the payment step. The demo skips payment on purpose, so this page only says so.
// (Wording is a placeholder the junior can rewrite.)
export default function PaymentPlaceholder() {
  const email = useLocation().state?.email

  return (
    <LightPage>
      <div className="light-column">
        <h1>Payment is omitted from this demo.</h1>
        <p>
          In a real service this is where you would choose a plan and add a card. Nothing was
          charged and nothing was saved.
        </p>
        {email && <p className="payment-email">Continuing as {email}</p>}
        <Link to="/signup" className="payment-back">Back</Link>
      </div>
    </LightPage>
  )
}
