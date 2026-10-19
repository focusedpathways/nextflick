import ShowcasePage from '../../components/ShowcasePage.jsx'
import EmailCapture from '../../components/EmailCapture.jsx'

// Landing: the shared showcase layout (video, header, Featured Films, footer) with the
// "Join now" callout inside it. The layout lives in ShowcasePage; the Gateway reuses it.
export default function Landing() {
  return (
    <ShowcasePage>
      <h1>Join now for the best access to your favorite shows and movies</h1>
      <p>Ready to watch? Enter your email to get started.</p>
      <EmailCapture variant="hero" />
    </ShowcasePage>
  )
}
