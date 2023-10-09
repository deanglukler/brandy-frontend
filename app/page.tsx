import { GetServerSideProps, GetStaticProps } from "next";
import { Product } from "./types";
import _ from "lodash";
import CityProducts from "./CityProducts";
import { Fragment, useState } from "react";
import { Card, Collapse } from "antd";

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

    // const collapseItems = _.keys(productsByCity).map((city) => {
    //     return {
    //         key: city,
    //         label: <h3>{city}</h3>,
    //         children: (
    //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
    //                 {productsByCity[city].map((p) => {
    //                     return <Card key={p.id}>{p.product_name}</Card>;
    //                 })}
    //             </div>
    //         ),
    //     };
    // });

    return (
        <div className="p-4 sm:max-w-lg md:max-w-3xl mx-auto">
            <header className="mb-8">
                <span className="font-thin text-2xl">BRANDY</span>
                <span className="text-sm font-thin">coffees finest</span>
            </header>

            <main>
                <CityProducts products={products} />
            </main>

            {/* <main>
                <Collapse
                    ghost
                    items={collapseItems}
                    size="large"
                    defaultActiveKey={[_.keys(productsByCity)[0]]}
                    expandIconPosition="end"
                    bordered
                />
            </main> */}
        </div>
    );
}
