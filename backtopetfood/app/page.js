import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>Back to Pet Food</span>
          <nav className={styles.nav}>
            <a href="#why">Why Us</a>
            <a href="#ingredients">Ingredients</a>
            <a href="#shop" className={styles.navCta}>Shop Now</a>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Real food. Real health.</p>
            <h1 className={styles.heroHeading}>
              Back to basics.<br />Back to pet food.
            </h1>
            <p className={styles.heroSub}>
              Whole-ingredient meals crafted for dogs and cats — no fillers,
              no mystery meat, no compromises.
            </p>
            <div className={styles.heroCtas}>
              <a href="#shop" className={styles.btnPrimary}>Shop for Dogs</a>
              <a href="#shop" className={styles.btnSecondary}>Shop for Cats</a>
            </div>
          </div>
          <div className={styles.heroBadge}>
            <span>100%</span>
            <span>whole</span>
            <span>ingredients</span>
          </div>
        </section>

        <section id="why" className={styles.whySection}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Why Back to Pet Food?</h2>
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🥩</div>
                <h3>Named proteins only</h3>
                <p>Chicken is chicken. Salmon is salmon. Every protein source is clearly identified — never "meat meal."</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🌾</div>
                <h3>No fillers, ever</h3>
                <p>Zero corn, wheat, soy, or artificial preservatives. Just the nutrients your pet actually needs.</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🔬</div>
                <h3>Vet formulated</h3>
                <p>Every recipe is balanced by veterinary nutritionists to meet AAFCO nutrient profiles for all life stages.</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🌍</div>
                <h3>Ethical sourcing</h3>
                <p>Ingredients from farms we visit and partners we trust — traceable from field to bowl.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="ingredients" className={styles.ingredientsSection}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>The ingredient difference</h2>
            <p className={styles.sectionSub}>
              Flip any bag of leading pet food and you'll see corn syrup and
              "by-product meal." Flip ours and you'll recognize every word.
            </p>
            <div className={styles.comparison}>
              <div className={styles.comparisonCol}>
                <h3 className={styles.comparisonBad}>Theirs</h3>
                <ul>
                  <li>Meat and bone meal</li>
                  <li>Corn syrup</li>
                  <li>BHA / BHT preservatives</li>
                  <li>Artificial colors</li>
                  <li>Unspecified "animal fat"</li>
                </ul>
              </div>
              <div className={styles.comparisonDivider} aria-hidden="true">vs</div>
              <div className={styles.comparisonCol}>
                <h3 className={styles.comparisonGood}>Ours</h3>
                <ul>
                  <li>Deboned chicken breast</li>
                  <li>Sweet potato</li>
                  <li>Blueberries</li>
                  <li>Salmon oil (Omega-3)</li>
                  <li>Pumpkin</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="shop" className={styles.ctaSection}>
          <div className={styles.sectionInner}>
            <h2 className={styles.ctaHeading}>Your pet deserves better.</h2>
            <p className={styles.ctaSub}>
              Try Back to Pet Food risk-free. If your pet doesn't love it,
              we'll refund your first order — no questions asked.
            </p>
            <a href="#shop" className={styles.btnPrimary}>Start your first order</a>
            <p className={styles.ctaNote}>Free shipping on orders over $49</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Back to Pet Food. All rights reserved.</p>
        <nav className={styles.footerNav}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </nav>
      </footer>
    </div>
  );
}
