import { Dropdown } from '@nextui-org/react'

import { filtersSelector, useMultipleDropdownState } from '../lib/atom'

export type MediaTag =
  | '4-koma'
  | 'Achromatic'
  | 'Achronological Order'
  | 'Acting'
  | 'Adoption'
  | 'Advertisement'
  | 'Afterlife'
  | 'Age Gap'
  | 'Age Regression'
  | 'Agender'
  | 'Agriculture'
  | 'Airsoft'
  | 'Alchemy'
  | 'Aliens'
  | 'Alternate Universe'
  | 'American Football'
  | 'Amnesia'
  | 'Anachronism'
  | 'Angels'
  | 'Animals'
  | 'Anthology'
  | 'Anthropomorphism'
  | 'Anti-Hero'
  | 'Archery'
  | 'Artificial Intelligence'
  | 'Asexual'
  | 'Assassins'
  | 'Astronomy'
  | 'Athletics'
  | 'Augmented Reality'
  | 'Autobiographical'
  | 'Aviation'
  | 'Badminton'
  | 'Band'
  | 'Bar'
  | 'Baseball'
  | 'Basketball'
  | 'Battle Royale'
  | 'Biographical'
  | 'Bisexual'
  | 'Body Horror'
  | 'Body Swapping'
  | 'Boxing'
  // eslint-disable-next-line quotes
  | "Boys' Love"
  | 'Bullying'
  | 'Butler'
  | 'Calligraphy'
  | 'Cannibalism'
  | 'Card Battle'
  | 'Cars'
  | 'Centaur'
  | 'CGI'
  | 'Cheerleading'
  | 'Chibi'
  | 'Chimera'
  | 'Chuunibyou'
  | 'Circus'
  | 'Classic Literature'
  | 'Clone'
  | 'College'
  | 'Coming of Age'
  | 'Conspiracy'
  | 'Cosmic Horror'
  | 'Cosplay'
  | 'Crime'
  | 'Crossdressing'
  | 'Crossover'
  | 'Cult'
  | 'Cultivation'
  | 'Cute Boys Doing Cute Things'
  | 'Cute Girls Doing Cute Things'
  | 'Cyberpunk'
  | 'Cyborg'
  | 'Cycling'
  | 'Dancing'
  | 'Death Game'
  | 'Delinquents'
  | 'Demons'
  | 'Denpa'
  | 'Desert'
  | 'Detective'
  | 'Dinosaurs'
  | 'Disability'
  | 'Dissociative Identities'
  | 'Dragons'
  | 'Drawing'
  | 'Drugs'
  | 'Dullahan'
  | 'Dungeon'
  | 'Dystopian'
  | 'E-Sports'
  | 'Economics'
  | 'Educational'
  | 'Elf'
  | 'Ensemble Cast'
  | 'Environmental'
  | 'Episodic'
  | 'Ero Guro'
  | 'Espionage'
  | 'Fairy'
  | 'Fairy Tale'
  | 'Family Life'
  | 'Fashion'
  | 'Female Harem'
  | 'Female Protagonist'
  | 'Femboy'
  | 'Fencing'
  | 'Firefighters'
  | 'Fishing'
  | 'Fitness'
  | 'Flash'
  | 'Food'
  | 'Football'
  | 'Foreign'
  | 'Found Family'
  | 'Fugitive'
  | 'Full CGI'
  | 'Full Color'
  | 'Gambling'
  | 'Gangs'
  | 'Gender Bending'
  | 'Ghost'
  | 'Go'
  | 'Goblin'
  | 'Gods'
  | 'Golf'
  | 'Gore'
  | 'Guns'
  | 'Gyaru'
  | 'Handball'
  | 'Henshin'
  | 'Heterosexual'
  | 'Hikikomori'
  | 'Historical'
  | 'Homeless'
  | 'Ice Skating'
  | 'Idol'
  | 'Isekai'
  | 'Iyashikei'
  | 'Josei'
  | 'Judo'
  | 'Kaiju'
  | 'Karuta'
  | 'Kemonomimi'
  | 'Kids'
  | 'Kuudere'
  | 'Lacrosse'
  | 'Language Barrier'
  | 'LGBTQ+ Themes'
  | 'Lost Civilization'
  | 'Love Triangle'
  | 'Mafia'
  | 'Magic'
  | 'Mahjong'
  | 'Maids'
  | 'Makeup'
  | 'Male Harem'
  | 'Male Protagonist'
  | 'Marriage '
  | 'Martial Arts'
  | 'Medicine'
  | 'Memory Manipulation'
  | 'Mermaid'
  | 'Meta'
  | 'Military'
  | 'Mixed Gender Harem'
  | 'Monster Boy'
  | 'Monster Girl'
  | 'Mopeds'
  | 'Motorcycles'
  | 'Musical'
  | 'Mythology'
  | 'Necromancy'
  | 'Nekomimi'
  | 'Ninja'
  | 'No Dialogue'
  | 'Noir'
  | 'Non-fiction'
  | 'Nudity'
  | 'Nun'
  | 'Office Lady'
  | 'Oiran'
  | 'Ojou-sama'
  | 'Orphan'
  | 'Otaku Culture'
  | 'Outdoor'
  | 'Pandemic'
  | 'Parkour'
  | 'Parody'
  | 'Philosophy'
  | 'Photography'
  | 'Pirates'
  | 'Poker'
  | 'Police'
  | 'Politics'
  | 'Post-Apocalyptic'
  | 'POV'
  | 'Primarily Adult Cast'
  | 'Primarily Child Cast'
  | 'Primarily Female Cast'
  | 'Primarily Male Cast'
  | 'Primarily Teen Cast'
  | 'Prison'
  | 'Puppetry'
  | 'Rakugo'
  | 'Real Robot'
  | 'Rehabilitation'
  | 'Reincarnation'
  | 'Religion'
  | 'Revenge'
  | 'Robots'
  | 'Rotoscoping'
  | 'Rugby'
  | 'Rural'
  | 'Samurai'
  | 'Satire'
  | 'School'
  | 'School Club'
  | 'Scuba Diving'
  | 'Seinen'
  | 'Shapeshifting'
  | 'Ships'
  | 'Shogi'
  | 'Shoujo'
  | 'Shounen'
  | 'Shrine Maiden'
  | 'Skateboarding'
  | 'Skeleton'
  | 'Slapstick'
  | 'Slavery'
  | 'Software Development'
  | 'Space'
  | 'Space Opera'
  | 'Spearplay'
  | 'Steampunk'
  | 'Stop Motion'
  | 'Succubus'
  | 'Suicide'
  | 'Sumo'
  | 'Super Power'
  | 'Super Robot'
  | 'Superhero'
  | 'Surfing'
  | 'Surreal Comedy'
  | 'Survival'
  | 'Swimming'
  | 'Swordplay'
  | 'Table Tennis'
  | 'Tanks'
  | 'Tanned Skin'
  | 'Teacher'
  // eslint-disable-next-line quotes
  | "Teens' Love"
  | 'Tennis'
  | 'Terrorism'
  | 'Time Manipulation'
  | 'Time Skip'
  | 'Tokusatsu'
  | 'Tomboy'
  | 'Torture'
  | 'Tragedy'
  | 'Trains'
  | 'Transgender'
  | 'Travel'
  | 'Triads'
  | 'Tsundere'
  | 'Twins'
  | 'Urban'
  | 'Urban Fantasy'
  | 'Vampire'
  | 'Video Games'
  | 'Vikings'
  | 'Villainess'
  | 'Virtual World'
  | 'Volleyball'
  | 'VTuber'
  | 'War'
  | 'Werewolf'
  | 'Witch'
  | 'Work'
  | 'Wrestling'
  | 'Writing'
  | 'Wuxia'
  | 'Yakuza'
  | 'Yandere'
  | 'Youkai'
  | 'Yuri'
  | 'Zombie'

type DropdownItem = {
  // TODO: make icon prop required
  icon?: JSX.Element
}

const items: Record<MediaTag, DropdownItem> = {
  /* eslint-disable @typescript-eslint/naming-convention */
  '4-koma': {},
  Achromatic: {},
  'Achronological Order': {},
  Acting: {},
  Adoption: {},
  Advertisement: {},
  Afterlife: {},
  'Age Gap': {},
  'Age Regression': {},
  Agender: {},
  Agriculture: {},
  Airsoft: {},
  Alchemy: {},
  Aliens: {},
  'Alternate Universe': {},
  'American Football': {},
  Amnesia: {},
  Anachronism: {},
  Angels: {},
  Animals: {},
  Anthology: {},
  Anthropomorphism: {},
  'Anti-Hero': {},
  Archery: {},
  'Artificial Intelligence': {},
  Asexual: {},
  Assassins: {},
  Astronomy: {},
  Athletics: {},
  'Augmented Reality': {},
  Autobiographical: {},
  Aviation: {},
  Badminton: {},
  Band: {},
  Bar: {},
  Baseball: {},
  Basketball: {},
  'Battle Royale': {},
  Biographical: {},
  Bisexual: {},
  'Body Horror': {},
  'Body Swapping': {},
  Boxing: {},
  // eslint-disable-next-line quotes
  "Boys' Love": {},
  Bullying: {},
  Butler: {},
  Calligraphy: {},
  Cannibalism: {},
  'Card Battle': {},
  Cars: {},
  Centaur: {},
  CGI: {},
  Cheerleading: {},
  Chibi: {},
  Chimera: {},
  Chuunibyou: {},
  Circus: {},
  'Classic Literature': {},
  Clone: {},
  College: {},
  'Coming of Age': {},
  Conspiracy: {},
  'Cosmic Horror': {},
  Cosplay: {},
  Crime: {},
  Crossdressing: {},
  Crossover: {},
  Cult: {},
  Cultivation: {},
  'Cute Boys Doing Cute Things': {},
  'Cute Girls Doing Cute Things': {},
  Cyberpunk: {},
  Cyborg: {},
  Cycling: {},
  Dancing: {},
  'Death Game': {},
  Delinquents: {},
  Demons: {},
  Denpa: {},
  Desert: {},
  Detective: {},
  Dinosaurs: {},
  Disability: {},
  'Dissociative Identities': {},
  Dragons: {},
  Drawing: {},
  Drugs: {},
  Dullahan: {},
  Dungeon: {},
  Dystopian: {},
  'E-Sports': {},
  Economics: {},
  Educational: {},
  Elf: {},
  'Ensemble Cast': {},
  Environmental: {},
  Episodic: {},
  'Ero Guro': {},
  Espionage: {},
  Fairy: {},
  'Fairy Tale': {},
  'Family Life': {},
  Fashion: {},
  'Female Harem': {},
  'Female Protagonist': {},
  Femboy: {},
  Fencing: {},
  Firefighters: {},
  Fishing: {},
  Fitness: {},
  Flash: {},
  Food: {},
  Football: {},
  Foreign: {},
  'Found Family': {},
  Fugitive: {},
  'Full CGI': {},
  'Full Color': {},
  Gambling: {},
  Gangs: {},
  'Gender Bending': {},
  Ghost: {},
  Go: {},
  Goblin: {},
  Gods: {},
  Golf: {},
  Gore: {},
  Guns: {},
  Gyaru: {},
  Handball: {},
  Henshin: {},
  Heterosexual: {},
  Hikikomori: {},
  Historical: {},
  Homeless: {},
  'Ice Skating': {},
  Idol: {},
  Isekai: {},
  Iyashikei: {},
  Josei: {},
  Judo: {},
  Kaiju: {},
  Karuta: {},
  Kemonomimi: {},
  Kids: {},
  Kuudere: {},
  Lacrosse: {},
  'Language Barrier': {},
  'LGBTQ+ Themes': {},
  'Lost Civilization': {},
  'Love Triangle': {},
  Mafia: {},
  Magic: {},
  Mahjong: {},
  Maids: {},
  Makeup: {},
  'Male Harem': {},
  'Male Protagonist': {},
  'Marriage ': {},
  'Martial Arts': {},
  Medicine: {},
  'Memory Manipulation': {},
  Mermaid: {},
  Meta: {},
  Military: {},
  'Mixed Gender Harem': {},
  'Monster Boy': {},
  'Monster Girl': {},
  Mopeds: {},
  Motorcycles: {},
  Musical: {},
  Mythology: {},
  Necromancy: {},
  Nekomimi: {},
  Ninja: {},
  'No Dialogue': {},
  Noir: {},
  'Non-fiction': {},
  Nudity: {},
  Nun: {},
  'Office Lady': {},
  Oiran: {},
  'Ojou-sama': {},
  Orphan: {},
  'Otaku Culture': {},
  Outdoor: {},
  Pandemic: {},
  Parkour: {},
  Parody: {},
  Philosophy: {},
  Photography: {},
  Pirates: {},
  Poker: {},
  Police: {},
  Politics: {},
  'Post-Apocalyptic': {},
  POV: {},
  'Primarily Adult Cast': {},
  'Primarily Child Cast': {},
  'Primarily Female Cast': {},
  'Primarily Male Cast': {},
  'Primarily Teen Cast': {},
  Prison: {},
  Puppetry: {},
  Rakugo: {},
  'Real Robot': {},
  Rehabilitation: {},
  Reincarnation: {},
  Religion: {},
  Revenge: {},
  Robots: {},
  Rotoscoping: {},
  Rugby: {},
  Rural: {},
  Samurai: {},
  Satire: {},
  School: {},
  'School Club': {},
  'Scuba Diving': {},
  Seinen: {},
  Shapeshifting: {},
  Ships: {},
  Shogi: {},
  Shoujo: {},
  Shounen: {},
  'Shrine Maiden': {},
  Skateboarding: {},
  Skeleton: {},
  Slapstick: {},
  Slavery: {},
  'Software Development': {},
  Space: {},
  'Space Opera': {},
  Spearplay: {},
  Steampunk: {},
  'Stop Motion': {},
  Succubus: {},
  Suicide: {},
  Sumo: {},
  'Super Power': {},
  'Super Robot': {},
  Superhero: {},
  Surfing: {},
  'Surreal Comedy': {},
  Survival: {},
  Swimming: {},
  Swordplay: {},
  'Table Tennis': {},
  Tanks: {},
  'Tanned Skin': {},
  Teacher: {},
  // eslint-disable-next-line quotes
  "Teens' Love": {},
  Tennis: {},
  Terrorism: {},
  'Time Manipulation': {},
  'Time Skip': {},
  Tokusatsu: {},
  Tomboy: {},
  Torture: {},
  Tragedy: {},
  Trains: {},
  Transgender: {},
  Travel: {},
  Triads: {},
  Tsundere: {},
  Twins: {},
  Urban: {},
  'Urban Fantasy': {},
  Vampire: {},
  'Video Games': {},
  Vikings: {},
  Villainess: {},
  'Virtual World': {},
  Volleyball: {},
  VTuber: {},
  War: {},
  Werewolf: {},
  Witch: {},
  Work: {},
  Wrestling: {},
  Writing: {},
  Wuxia: {},
  Yakuza: {},
  Yandere: {},
  Youkai: {},
  Yuri: {},
  Zombie: {},
  /* eslint-enable @typescript-eslint/naming-convention */
}

export function TagDropdown(): JSX.Element {
  const [keys, onChange] = useMultipleDropdownState(filtersSelector('tagIn'))

  return (
    <Dropdown>
      <Dropdown.Button flat>
        Tags
        {keys.length > 0 && `: ${keys[0]}`}
        {keys.length > 1 && ', ...'}
      </Dropdown.Button>
      <Dropdown.Menu
        items={Object.entries(items)}
        selectedKeys={keys}
        selectionMode="multiple"
        onSelectionChange={onChange}
      >
        {
          // @ts-expect-error Dropdown.Item does not support generics for now
          ([key, { icon }]: [MediaTag, DropdownItem]) => (
            <Dropdown.Item key={key} icon={icon}>
              {key}
            </Dropdown.Item>
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
