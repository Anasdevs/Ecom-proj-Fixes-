

import { getApis } from '@/api/client'
import SingleProduct_details from '@/components/BestSeller/SingleProduct_details'
import React from 'react'

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const k = await getApis.getProductDetail(params.slug)


  return (
    <div>
      <SingleProduct_details detail={k} />
    </div>
  )
}
