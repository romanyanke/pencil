import { Pencil } from '../../Pencil/Pencil.interface'

export const mockPencil: Pencil = {
  title: 'Римский Пиноккио',
  geo: 'ITA',
  city: 'Рим',
  id: 'roma',
  grid: 2,
  count: 1,
  country: { flag: '🇮🇹', geo: 'ITA', name: 'Италия', pencils: 1 },
  map: {
    lat: 41.892099,
    lng: 12.474878,
  },
  content:
    "<ul> <li><strong>Пиноккио I</strong></li> <li><a href='?display=pinocchio-second'>Пиноккио II</a></li> <li><a href='?display=pinocchio-third'>Пиноккио III</a></li> </ul>  <p>Roma, Рим. На конце карандаща сидит деревянный пиноккио, руки и ноги болтаются на веревочках, а из колпака торчит петля из резинки, чтобы подвесить его куда-нибудь. Еще у него есть два брата-бдизнеца.</p> ",
  photos: [
    'https://romanyanke.github.io/pencilbox-static/pencil/roma/gallery/roma-1.jpg',
    'https://romanyanke.github.io/pencilbox-static/pencil/roma/gallery/roma-2.jpg',
    'https://romanyanke.github.io/pencilbox-static/pencil/roma/gallery/roma-3.jpg',
  ],
  preview:
    'https://romanyanke.github.io/pencilbox-static/pencil/roma/gallery/roma-1_hufb33aafe8ffd214e4fc11de6b8dacb8a_28007_300x0_resize_q75_box.jpg',
  tags: [
    'государственный',
    'город',
    'человек',
    'с игрушкой',
    'круглый',
    'без резинки',
    'новый',
    'тупой',
  ],
}
