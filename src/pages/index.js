import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import HomeSection from '@/components/LandingPage/HomeSection'
import MondaInfo from '@/components/LandingPage/MondaInfo'
import WhyUs from '@/components/LandingPage/WhyUs'

export default function Home() {
  return (
    <Layout>
      <HomeSection />
      <MondaInfo />
      <WhyUs />
      <h1>tes</h1>
    </Layout>
  )
}
