"use client";

import React, { useState } from "react";
import { Product } from "./types";
import { Avatar, Card, Collapse, Input } from "antd";
import _ from "lodash";
import Image from "next/image";
import { SearchOutlined } from "@ant-design/icons";

interface CityProductsProps {
    products: Product[];
}

const CityProducts: React.FC<CityProductsProps> = ({ products }) => {
    const productsByCity: { [key: string]: Product[] } = {};

    products.forEach((product: Product) => {
        if (!productsByCity[product.location]) {
            productsByCity[product.location] = [];
        }
        productsByCity[product.location].push(product);
    });

    const [activeTab, setActiveTab] = useState(_.keys(productsByCity)[0]);
    const [search, setSearch] = useState("");

    function onTabChange(key: string) {
        setActiveTab(key);
    }

    function searchFilter(products: Product[]): Product[] {
        if (!search) return products;

        let cityFilter: Product[] = [...products];

        // if one of the words in the search is a cite, filter out all other results
        const searchWords = search
            .trim()
            .split(" ")
            .map((w) => w.toLowerCase());
        const cities = _.keys(productsByCity).map((c) => c.toLowerCase());
        const cityMatches = searchWords.filter((w) => cities.includes(w));
        if (cityMatches.length > 0) {
            cityFilter = products.filter((p) =>
                cityMatches.includes(p.location.toLowerCase())
            );
        } else {
            cityFilter = products;
        }

        const searchWordsIgnoringCities = searchWords.filter(
            (w) => !cities.includes(w)
        );

        if (searchWordsIgnoringCities.length === 0) return cityFilter;

        const results: Product[] = [];
        // check all cityFilter for matches to any word in searchWords
        cityFilter.forEach((p) => {
            const productWords = [
                p.brand_name.toLowerCase(),
                p.product_name.toLowerCase(),
                p.category.toLowerCase(),
            ];
            if (
                productWords.some((w) =>
                    searchWordsIgnoringCities.some((sw) => w.includes(sw))
                )
            ) {
                results.push(p);
            }
        });

        return results;
    }

    const tabList = _.keys(productsByCity).map((city) => {
        const results = searchFilter(productsByCity[city]).length;
        return {
            key: city,
            label: `${city} (${results})`,
        };
    });

    return (
        <>
            <div className="mb-4">
                <Input
                    size="large"
                    placeholder="Search for a product..."
                    prefix={<SearchOutlined />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Card onTabChange={onTabChange} tabList={tabList}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {searchFilter(productsByCity[activeTab]).map((p) => {
                        return (
                            <Card key={p.id}>
                                <div className="flex">
                                    <Avatar
                                        style={{ width: 100, height: 100 }}
                                        icon={
                                            <div
                                                style={{
                                                    height: 0,
                                                    paddingTop: "100%",
                                                    position: "relative",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 0,
                                                        left: 0,
                                                        bottom: 0,
                                                        backgroundImage: `url(${p.image_url})`,
                                                        backgroundSize: "cover",
                                                    }}
                                                />
                                            </div>
                                        }
                                    />
                                    <div className="ml-4">
                                        <h3 className="font-thin mt-0 mb-2">
                                            {p.brand_name} | {p.product_name}
                                        </h3>
                                        <p className="my-0 font-thin">
                                            Category
                                        </p>
                                        <p className="my-0 text-xs">
                                            {p.category}
                                        </p>
                                        <p className="my-0 font-thin">
                                            Location
                                        </p>
                                        <p className="my-0 text-xs">
                                            {p.location}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </Card>
        </>
    );
};

export default CityProducts;
