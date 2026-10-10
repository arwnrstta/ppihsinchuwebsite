import ContactForm from '../components/ContactForm.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import { contact } from '../config/site.js'
import './Contact.css'

/*
 * CONNECT WITH US
 * ---------------
 * Social media links on one side, the contact form on the other.
 *
 * Social links and the contact email: src/config/site.js
 * Form fields:                        src/data/contactForms.js
 */
export default function Contact() {
  return (
    <section id="connect" className="section contact" aria-labelledby="connect-title">
      <div className="container contact__layout">
        <Reveal className="contact__intro">
          <p className="eyebrow">05 / Connect with us</p>
          <h2 id="connect-title" className="contact__title">
            Come as you are. Stay for the community.
          </h2>
          <p className="lead">
            Whether you’ve just arrived or you’ve called Hsinchu home for
            years, there’s a place for you here. Students, organisations, and
            sponsors are all welcome to say hello.
          </p>

          {contact.email && (
            <a href={`mailto:${contact.email}`} className="contact__email">
              <Icon name="mail" />
              {contact.email}
            </a>
          )}

          <h3 className="contact__social-heading">Follow along</h3>
          <SocialLinks variant="cards" />
        </Reveal>

        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
