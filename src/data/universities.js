/*
 * UNIVERSITIES (CAMPUS MAP)
 * -------------------------
 * The schools shown as pins on the map in About -> "Our Campuses".
 * Each entry becomes one pin on the map and one card in the list below it.
 *
 * FIELDS
 *   id        - a short unique name with no spaces
 *   shortName - the abbreviation shown on the card (e.g. 'NTHU')
 *   name      - the official name. Official names are not translated, except
 *               that the school's own Chinese name is shown to Chinese readers.
 *   area      - the district or town, written per language
 *   latitude  - the pin's position on the map (north-south)
 *   longitude - the pin's position on the map (east-west)
 *   url       - the school's official website, starting with https://
 *
 * HOW TO FIND LATITUDE AND LONGITUDE
 *   1. Open Google Maps and find the campus.
 *   2. Right-click the exact spot and click the two numbers at the top of
 *      the menu (for example "24.79610, 120.99670"). This copies them.
 *   3. The first number is the latitude, the second is the longitude.
 *
 * To add a school, copy one block, paste it and change the details.
 * To remove a school, delete its block. The map adjusts itself to fit all pins.
 */

export const universities = [
  {
    id: 'nthu',
    shortName: 'NTHU',
    name: {
      en: 'National Tsing Hua University',
      'zh-TW': '國立清華大學',
    },
    area: {
      en: 'East District, Hsinchu City',
      id: 'Distrik Timur, Kota Hsinchu',
      'zh-TW': '新竹市東區',
    },
    latitude: 24.7961,
    longitude: 120.9967,
    url: 'https://www.nthu.edu.tw/',
  },
  {
    id: 'nycu',
    shortName: 'NYCU',
    name: {
      en: 'National Yang Ming Chiao Tung University',
      'zh-TW': '國立陽明交通大學',
    },
    area: {
      en: 'Guangfu Campus, East District, Hsinchu City',
      id: 'Kampus Guangfu, Distrik Timur, Kota Hsinchu',
      'zh-TW': '光復校區，新竹市東區',
    },
    latitude: 24.7868,
    longitude: 120.9972,
    url: 'https://www.nycu.edu.tw/',
  },
  {
    id: 'must',
    shortName: 'MUST',
    name: {
      en: 'Minghsin University of Science and Technology',
      'zh-TW': '明新科技大學',
    },
    area: {
      en: 'Xinfeng Township, Hsinchu County',
      id: 'Kecamatan Xinfeng, Kabupaten Hsinchu',
      'zh-TW': '新竹縣新豐鄉',
    },
    latitude: 24.8617,
    longitude: 120.9872,
    url: 'https://www.must.edu.tw/',
  },
  {
    id: 'cute',
    shortName: 'CUTE',
    name: {
      en: 'China University of Technology',
      'zh-TW': '中國科技大學',
    },
    area: {
      en: 'Hsinchu Campus, Hukou Township, Hsinchu County',
      id: 'Kampus Hsinchu, Kecamatan Hukou, Kabupaten Hsinchu',
      'zh-TW': '新竹校區，新竹縣湖口鄉',
    },
    latitude: 24.9175,
    longitude: 121.057,
    url: 'https://www.cute.edu.tw/',
  },
  {
    id: 'ypu',
    shortName: 'YPU',
    name: {
      en: 'Yuanpei University of Medical Technology',
      'zh-TW': '元培醫事科技大學',
    },
    area: {
      en: 'Xiangshan District, Hsinchu City',
      id: 'Distrik Xiangshan, Kota Hsinchu',
      'zh-TW': '新竹市香山區',
    },
    latitude: 24.7766,
    longitude: 120.9407,
    url: 'https://www.ypu.edu.tw/',
  },
  {
    id: 'chu',
    shortName: 'CHU',
    name: {
      en: 'Chung Hua University',
      'zh-TW': '中華大學',
    },
    area: {
      en: 'Xiangshan District, Hsinchu City',
      id: 'Distrik Xiangshan, Kota Hsinchu',
      'zh-TW': '新竹市香山區',
    },
    latitude: 24.76,
    longitude: 120.9534,
    url: 'https://www.chu.edu.tw/',
  },
  {
    id: 'ydu',
    shortName: 'YDU',
    name: {
      en: 'Yu Da University of Science and Technology',
      'zh-TW': '育達科技大學',
    },
    area: {
      en: 'Zaoqiao Township, Miaoli County',
      id: 'Kecamatan Zaoqiao, Kabupaten Miaoli',
      'zh-TW': '苗栗縣造橋鄉',
    },
    latitude: 24.6509,
    longitude: 120.843,
    url: 'https://www.ydu.edu.tw/',
  },
  {
    id: 'hwu',
    shortName: 'HWU',
    name: {
      en: 'Hsing Wu University',
      'zh-TW': '醒吾科技大學',
    },
    area: {
      en: 'Linkou District, New Taipei City',
      id: 'Distrik Linkou, Kota New Taipei',
      'zh-TW': '新北市林口區',
    },
    latitude: 25.0819,
    longitude: 121.3952,
    url: 'https://www.hwu.edu.tw/',
  },
]
