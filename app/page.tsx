'use client'
import { Redirect } from 'next';
import Image from 'next/image'
import { useState } from 'react'
import { Roboto_Slab } from 'next/font/google';

  const roboto = Roboto_Slab({
    weight: '400',
    subsets: ['latin'],
  })

export default function Home() {

  interface Rendimentos {
    month: number;
    moneyInvested: number;
    moneyFromInterest: number;
    moneyTotal: number;
  }

  const [startValue,setStartValue] = useState<number>(0)
  const [monthlyValue,setMonthlyValue] = useState<number>(0)
  const [interestRate,setInterestRate] = useState<number>(0)

  const calculateIncome = () => {
    var YEARS: number = 30;
    var amount: number = startValue;
    var returnArray: Array<Rendimentos> = [];

    for (let i = 1; i<=YEARS*12; i++) {
      amount = Number(amount) + Number(monthlyValue);
      amount = Number(amount) * (1+Number(interestRate/100));
      returnArray.push({
        month: i,
        moneyInvested: i*monthlyValue + Number(startValue),
        moneyFromInterest: amount - (i*monthlyValue + Number(startValue)),
        moneyTotal: amount
      })
    }

    return returnArray;
  }

  return (
    <main className="min-h-screen padding-main justify-around">
      <div className="basic-container title">
        <h1 className={roboto.className}>Calculadora de investimentos e juros compostos</h1>
      </div>
      <div className="input-container basic-container">
        <div className="input">
            <a>Quantia Inicial:</a>
            <input
              type="number"
              id="startValue"
              value={startValue}
              onChange={(e:any) => setStartValue(e.target.value)}
            />
            <a>Quantia mensal:</a>
            <input
              type="number"
              id="startValue"
              value={monthlyValue}
              onChange={(e:any) => setMonthlyValue(e.target.value)}
            />
            <a>Rendimento mensal em %:</a>
            <input
              type="number"
              id="startValue"
              value={interestRate}
              onChange={(e:any) => setInterestRate(e.target.value)}
            />
        </div>
      </div>
      <div className='results basic-container'>
        <a>Rendimentos:</a>
        <div className="border">
          <div className='results-div'>
              <p className='width-10-percent'>Mês:</p>
              <p className='width-30-percent'>Valor total investido:</p>
              <p className='width-30-percent'>Rendimentos:</p>
              <p className='width-30-percent'>Valor total:</p>
            </div>
          {calculateIncome().map((e:Rendimentos, i: number)=>(
            <div className='results-div' key={i}>
              <p className='width-10-percent'> {e.month} </p>
              <p className='width-30-percent'> {e.moneyInvested.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </p>
              <p className='width-30-percent'> {e.moneyFromInterest.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </p>
              <p className='width-30-percent'> {e.moneyTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
