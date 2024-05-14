import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { slug: string } }
) {
    const { slug } = params;

    // var re = await fetch(
    //     `${process.env.NEXT_PUBLIC_API}/product-categories/${slug}?` +
    //         new URLSearchParams({
    //             mitra_id: process.env.NEXT_MITRA_ID as string,
    //         }),
    //     {
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         cache: "no-store",
    //     }
    // );

    // var result = await re.json();

    var result = {
        "status": "SUCCESS",
        "code": "0000",
        "data": {
            "uuid": "4c0af17a-9883-4f6c-9b78-da1a5d03f84b",
            "code": "Indosat-C",
            "alias": "INDOSAT",
            "status": 2,
            "banner_image": "",
            "logo_image": "",
            "description": "",
            "products": [
                {
                    "uuid": "3dcd16cb-e78b-425c-8356-e3250b5e7a0c",
                    "product_sku": "ISATTRF50",
                    "product_name": "Indosat Pulsa Transfer 50.000",
                    "sale_price": 59876,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": [
                        {
                            "id": 6,
                            "discount_price": 1000,
                            "start_at": "2023-05-06T07:00:00+07:00",
                            "finish_at": "2023-05-07T07:00:00+07:00",
                            "active": true
                        },
                        {
                            "id": 5,
                            "discount_price": 100,
                            "start_at": "2023-01-01T07:00:00+07:00",
                            "finish_at": "2023-01-02T07:00:00+07:00",
                            "active": false
                        }
                    ]
                },
                {
                    "uuid": "1fb1a5e6-9b1a-4fc0-b25c-6e0aa0336872",
                    "product_sku": "ISATTRF25",
                    "product_name": "Indosat Pulsa Transfer 25.000",
                    "sale_price": 34900,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "e4a3235c-f834-422f-b828-53039e91a893",
                    "product_sku": "ISATTRF200",
                    "product_name": "Indosat Pulsa Transfer 200.000",
                    "sale_price": 201719,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "e67264cf-c556-411e-8e66-dfdfd1f42042",
                    "product_sku": "ISATTRF20",
                    "product_name": "Indosat Pulsa Transfer 20.000",
                    "sale_price": 29733,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "bc39fb3d-17ad-431d-9e30-3a6f940fc255",
                    "product_sku": "ISATTRF100",
                    "product_name": "Indosat Pulsa Transfer 100.000",
                    "sale_price": 107671,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "de2f1727-f870-4221-bece-da794955fbda",
                    "product_sku": "ISATTRF10",
                    "product_name": "Indosat Pulsa Transfer 10.000",
                    "sale_price": 20358,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "934cabc7-e741-483f-95f3-8c9578280ebe",
                    "product_sku": "ISATREG500",
                    "product_name": "Indosat 500.000",
                    "sale_price": 495241,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "77471550-7854-46e7-970a-b56b108ba5d7",
                    "product_sku": "ISATREG50",
                    "product_name": "Indosat 50.000",
                    "sale_price": 60636,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "39f905de-8f6b-4214-b531-33fa4afd4883",
                    "product_sku": "ISATREG25",
                    "product_name": "Indosat 25.000",
                    "sale_price": 35305,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "ef41b101-fefa-454a-a7c4-5dc6dc5904f7",
                    "product_sku": "ISATREG1JT",
                    "product_name": "Indosat 1.000.000",
                    "sale_price": 981276,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "fb918299-e588-4db6-95aa-65432350f460",
                    "product_sku": "ISAT5",
                    "product_name": "Indosat 5.000",
                    "sale_price": 16326,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "bb4a1587-f154-4d8f-b717-d0d00acb3317",
                    "product_sku": "ISAT30",
                    "product_name": "Indosat 30.000",
                    "sale_price": 41345,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "993b18da-b449-4cbe-9b5e-f9c0675020ae",
                    "product_sku": "ISAT25",
                    "product_name": "Indosat 25.000",
                    "sale_price": 36235,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "a165baee-186f-4c2a-a990-b3047db3f369",
                    "product_sku": "ISAT20",
                    "product_name": "Indosat 20.000",
                    "sale_price": 30985,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "4e52d98e-1501-4ef2-92cc-fa32ec1c0203",
                    "product_sku": "ISAT100",
                    "product_name": "Indosat 100.000",
                    "sale_price": 112249,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "60fa010e-8d88-47ce-a630-3e986510e5f8",
                    "product_sku": "ISAT10",
                    "product_name": "Indosat 10.000",
                    "sale_price": 21471,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "e46786aa-64aa-41f3-ae88-67dbea7cbb68",
                    "product_sku": "ISAT90",
                    "product_name": "Indosat 90.000",
                    "sale_price": 101533,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "c4e20e4d-ff94-4b12-ab54-e42bdf2967d5",
                    "product_sku": "ISATREG100",
                    "product_name": "Indosat 100.000",
                    "sale_price": 108542,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "8e770396-bd89-4d1d-9270-a1c5d9432384",
                    "product_sku": "ISATREG10",
                    "product_name": "Indosat 10.000",
                    "sale_price": 20767,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "d61f5e3e-762f-457b-afb8-68c424dce647",
                    "product_sku": "ISAT80",
                    "product_name": "Indosat 80.000",
                    "sale_price": 92220,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "f9b8f566-239c-4eaa-8b24-549262b94684",
                    "product_sku": "ISAT70",
                    "product_name": "Indosat 70.000",
                    "sale_price": 81421,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "3d0bd93d-992f-4cf4-829b-273aa5ff651f",
                    "product_sku": "ISAT60",
                    "product_name": "Indosat 60.000",
                    "sale_price": 71923,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                },
                {
                    "uuid": "29550bf7-3c42-460d-8274-3579da910d1e",
                    "product_sku": "ISAT50",
                    "product_name": "Indosat 50.000",
                    "sale_price": 61930,
                    "category_alias": "",
                    "category_code": "Indosat-C",
                    "active": true,
                    "flash_sales": null
                }
            ],
            "forms": null
        },
        "pagination": null,
        "error_message": null
    }

    return NextResponse.json(result, { status: 200 });
}
