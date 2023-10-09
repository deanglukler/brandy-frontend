import { Product } from "./types";
import _ from "lodash";
import CityProducts from "./CityProducts";

async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch(
            "https://brandy-backend-i-dunno.koyeb.app/products"
        );
        const products = await response.json();
        console.log(products);
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function Home() {
    const products = await fetchProducts();

    return (
        <div className="p-4 sm:max-w-lg md:max-w-3xl mx-auto">
            <header className="mb-8">
                <span className="font-thin text-3xl">BRANDY</span>
                <span className="text-lg font-thin">coffees finest</span>
            </header>

            <main>
                <CityProducts products={products} />
            </main>
        </div>
    );
}
