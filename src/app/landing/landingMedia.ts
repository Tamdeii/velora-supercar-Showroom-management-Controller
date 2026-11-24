export const landingMedia = {
  heroPoster: '/media/landing/hero/hero-showroom.png',
  heroLoopMp4: '/media/landing/hero/car%20vid.mp4',
  heroLoopWebm: '',
  vehicles: [
    {
      name: 'HongT V1 Standard Edition',
      meta: '2026  SUPERNOVA SILVER  COUPE',
      status: 'AVAILABLE',
      price: '$345,000',
      image: '/media/vehicles/exterior/exterior-rear.png',
      alt: 'Rear exterior view from the HongT collection',
    },
    {
      name: 'HongT V1 Touring Edition',
      meta: '2026  SUPERNOVA SILVER  ALCANTARA CABIN',
      status: 'AVAILABLE',
      price: '$389,000',
      image: '/media/vehicles/interior/interior-cockpit.png',
      alt: 'Cockpit interior from the HongT collection',
    },
    {
      name: 'HongT V1 Carbon Edition',
      meta: '2026  SUPERNOVA SILVER  CARBON PACK',
      status: 'SOLD OUT',
      price: '$425,000',
      image: '/media/vehicles/details/detail-carbon-mirror.png',
      alt: 'Carbon mirror detail from the HongT collection',
    },
  ],
} as const
