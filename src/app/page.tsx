import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      <Head>
        <title>MarketBridge - Revolutionizing Supply Chains</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="bg-[#1C658C] text-white py-20">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Revolutionizing Supply Chains
              </h1>
              <h2 className="text-xl md:text-2xl mb-6">
                Connect Directly with Wholesalers and Manufacturers
              </h2>
              <p className="mb-8">
                MarketBridge streamlines the supply chain, empowering businesses
                to establish direct, efficient, and profitable partnerships
                between production and distribution.
              </p>
              <a
                href="/ProductList"
                className="bg-[#D8D2CB] text-[#1C658C] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#398AB9] hover:text-white transition-colors"
              >
                Get Started Today
              </a>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/main.jpeg"
                alt="Supply Chain Illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* About MarketBridge */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              What is MarketBridge?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
              MarketBridge is a revolutionary platform designed to connect
              manufacturers and wholesalers seamlessly. Our mission is to
              eliminate the middlemen, reduce costs, and ensure that both
              parties benefit from a more transparent and efficient supply
              chain. With MarketBridge, manufacturers can directly access a
              network of wholesalers eager to source quality products, while
              wholesalers can secure reliable supply lines with ease.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="bg-[#EEEEEE] py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose MarketBridge?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Direct Connections",
                  description:
                    "Skip the middleman and establish direct relationships with manufacturers or wholesalers.",
                },
                {
                  title: "Cost Efficiency",
                  description:
                    "Reduce operational costs and enhance profit margins by streamlining your supply chain.",
                },
                {
                  title: "Trusted Network",
                  description:
                    "Join a vetted network of reliable manufacturers and wholesalers for guaranteed quality and dependability.",
                },
                {
                  title: "Advanced Analytics",
                  description:
                    "Leverage data-driven insights to optimize your supply chain and make informed business decisions.",
                },
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4 text-[#1C658C]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              How MarketBridge Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Sign Up",
                  description:
                    "Create your account as a manufacturer or wholesaler and fill out your profile to join our network.",
                },
                {
                  title: "Connect",
                  description:
                    "Browse through our network to find potential partners and start building your business relationships.",
                },
                {
                  title: "Transact",
                  description:
                    "Negotiate terms, place orders, and manage your transactions all through the MarketBridge platform.",
                },
                {
                  title: "Grow",
                  description:
                    "Expand your business by building long-term partnerships and scaling your operations efficiently.",
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#1C658C] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[#EEEEEE] py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Success Stories with MarketBridge
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "MarketBridge has completely revolutionized how we source our products. The direct connection with manufacturers has been a game-changer for our business.",
                  author: "A Wholesaler",
                },
                {
                  quote:
                    "Thanks to MarketBridge, we've been able to reduce our distribution costs significantly while expanding our reach to more wholesalers.",
                  author: "A Manufacturer",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 mb-4">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <p className="font-semibold text-right">
                    - {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1C658C] text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Supply Chain?
            </h2>
            <p className="text-xl mb-8">
              Join MarketBridge today and start building more efficient,
              profitable business relationships.
            </p>
            <div>
              <a
                href="/signup"
                className="bg-[#D8D2CB] text-[#1C658C] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#398AB9] hover:text-white transition-colors mr-4"
              >
                Sign Up Now
              </a>
              <a
                href="#"
                className="bg-white text-[#1C658C] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#EEEEEE] transition-colors"
              >
                Request a Demo
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1C658C] text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 MarketBridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
