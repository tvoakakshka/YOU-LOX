import React, {useState} from 'react';
import './ProductList.css';
import {ProductItem} from "./ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: "айфон 1",price: 1, description: "не ломаный,новый", img: 'https://s0.rbk.ru/v6_top_pics/media/img/1/16/346880469247161.webp'},
    {id: '2', title: "сони",price: 900, description: "самое новое ", img: 'https://rarephones.ru/image/cache/catalog/products/sonyericsson/sonyericssonw810i/sonyericssonw810i-800x800.jpg'},
    {id: '3', title: "чупокабра",price: 666, description: "ест ", img: 'https://cdn-images.threadless.com/threadless-media/artist_shops/shops/westinchurch/products/1129162/shirt-1567094125-7d57b2727f387772978036a941981434.png?v=3&d=eyJvcHMiOiBbWyJpZl8iLCBbeyJ0IjogImV4cHIiLCAidiI6IFsiaGFzX2FscGhhIiwgbnVsbCwgbnVsbF19LCB7InQiOiAiY29tcCIsICJ2IjogWyJ0aHJlYWRsZXNzLW1lZGlhL2FydGlzdF9zaG9wcy9zaG9wcy93ZXN0aW5jaHVyY2gvcHJvZHVjdHMvMTEyOTE2Mi9zaGlydC0xNTY3MDk0MTI1LTdkNTdiMjcyN2YzODc3NzI5NzgwMzZhOTQxOTgxNDM0LnBuZyIsIFtbInRyaW0iLCBbdHJ1ZSwgZmFsc2VdLCB7fV0sIFsicmVzaXplIiwgWzY4NS43MSwgOTI2Ljk5OTk5OTk5OTk5OTldLCB7Im1heF9zY2FsZSI6IDIuMH1dLCBbInBhZCIsIFs2MTguMCwgMjY0LjY2LCA1MTUuMCwgMjUyLjYzXSwgeyJiYWNrZ3JvdW5kIjogIjIzMTkwOCJ9XSwgWyJjYW52YXNfY2VudGVyZWQiLCBbMTIwMy4wLCAyMDYwLjBdLCB7ImJhY2tncm91bmQiOiAiMjMxOTA4In1dXV19LCB7InQiOiAiY29tcCIsICJ2IjogWyJ0aHJlYWRsZXNzLW1lZGlhL2FydGlzdF9zaG9wcy9zaG9wcy93ZXN0aW5jaHVyY2gvcHJvZHVjdHMvMTEyOTE2Mi9zaGlydC0xNTY3MDk0MTI1LTdkNTdiMjcyN2YzODc3NzI5NzgwMzZhOTQxOTgxNDM0LnBuZyIsIFtbInJlc2l6ZSIsIFsxMjAzLjAsIDIwNjAuMF0sIHsibWF4X3NjYWxlIjogMi4wLCAic3R5bGUiOiAiQ1JPUCJ9XSwgWyJjYW52YXNfY2VudGVyZWQiLCBbMTIwMy4wLCAyMDYwLjBdLCB7ImJhY2tncm91bmQiOiAiZmZmZmZmIn1dXV19XSwge31dLCBbImVuY29kZSIsIFsiLnBuZyJdLCB7ImRwaSI6IDMwMH1dLCBbInJlc2l6ZSIsIFsxMDYxXSwge31dLCBbIm92ZXJsYXkiLCBbInRocmVhZGxlc3MtbWVkaWEvYXJ0aXN0X3Nob3BzL292ZXJsYXlzLzliNjc4MGU5YzRjOGRlNjJkYmNjODRmOTNjN2Y1ZmZhL2Zyb250LTE1MzY3NzQ1NjYtOGRiZGY3ZjZmMmE1ZmVmOGZhNTJhMThhMTEzYTQxMGEucG5nIl0sIHsieCI6IDQ3NywgInkiOiA5NiwgImJhY2tncm91bmQiOiAiMjMxOTA4In1dLCBbInJlc2l6ZSIsIFs4MDBdLCB7fV0sIFsiY2FudmFzX2NlbnRlcmVkIiwgWzgwMCwgODAwLCAiI2ZmZmZmZiJdLCB7fV0sIFsiZW5jb2RlIiwgWyJqcGciLCA4NV0sIHt9XV0sICJmb3JjZSI6IGZhbHNlLCAib25seV9tZXRhIjogZmFsc2V9'},
    {id: '4', title: "рука с ногтями",price: 100000, description: "не красивые", img: 'https://i.pinimg.com/originals/42/cb/5c/42cb5cdc9507bf300c951f4b4cc94bf3.jpg'},
    {id: '5', title: "голова",price: 10, description: "женская", img: 'https://darly.ru/components/com_jshopping/files/img_products/full_HTB1DzerN9zqK1RjSZFLq6An2XXas.jpg_q50____________.jpg'},
    {id: '6', title: "змея",price: 700, description: "кусается", img: 'https://s0.rbk.ru/v6_top_pics/media/img/4/11/346881187463114.webp'},
    {id: '7', title: "винкс",price: 10000, description: "фигурка", img: 'https://media.au.ru/imgs/b091872d3303d5233890641a41f7875e/'},
    {id: '8', title: "кракен",price: 5, description: "фиг знает", img: 'https://icdn.lenta.ru/images/2021/12/24/12/20211224124255373/square_320_457c212adf2697c723a8159698e1d322.jpg'}

   ]


const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

export const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);

    const {tg, queryId, onClose} = useTelegram();

    const onSendData = useCallback(() => {
        
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
            tg.onClose()
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};
 