/**
 * Fixture-like "sample" HTML-cased components for filling out pattern and
 * component examples.
 */

/**
 * <li> elements for examples. The international NATO phonetic (radio) alphabet.
 */
export function SampleListElements() {
  return (
    <>
      <li>Alpha</li>
      <li>Bravo</li>
      <li>Charlie</li>
      <li>Delta</li>
      <li>Echo</li>
      <li>Foxtrot</li>
      <li>Golf</li>
      <li>Hotel</li>
      <li>India</li>
      <li>Juliett</li>
      <li>Kilo</li>
      <li>Lima</li>
      <li>Mike</li>
      <li>November</li>
      <li>Oscar</li>
      <li>Papa</li>
      <li>Quebec</li>
      <li>Romeo</li>
      <li>Sierra</li>
      <li>Tango</li>
      <li>Uniform</li>
      <li>Victor</li>
      <li>Whiskey</li>
      <li>XRay</li>
      <li>Yankee</li>
      <li>Zulu</li>
    </>
  );
}

export function SampleTableBody() {
  return (
    <tbody>
      <tr>
        <td>Alphanumeric Balloons</td>
        <td>Champagne Delusions</td>
      </tr>
      <tr>
        <td>Elephantine Fry-ups</td>
        <td>Gargantuan Hiccups</td>
      </tr>
      <tr className="is-selected">
        <td>Illicit Jugglers</td>
        <td>Katydid Lozenges Meringue</td>
      </tr>
      <tr>
        <td>Alphanumeric Balloons</td>
        <td>Champagne Delusions</td>
      </tr>
      <tr>
        <td>Elephantine Fry-ups</td>
        <td>Gargantuan Hiccups</td>
      </tr>
      <tr>
        <td>Illicit Jugglers</td>
        <td>Katydid Lozenges Moebius</td>
      </tr>
      <tr>
        <td>Elephantine Fry-ups</td>
        <td>Gargantuan Hiccups</td>
      </tr>
      <tr>
        <td>Illicit Jugglers</td>
        <td>Katydid Lozenges Meringue</td>
      </tr>
      <tr>
        <td>Alphanumeric Balloons</td>
        <td>Champagne Delusions</td>
      </tr>
    </tbody>
  );
}

/**
 * Provide Lorem Ipsum text.
 */

/**
 * @param {object} props
 *   @param {'sm'|'md'|'lg'} [props.size]
 */
export function LoremIpsum({ size = 'lg' }) {
  if (size === 'sm') {
    return (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a sapien
        cursus, fringilla diam posuere, varius urna. Phasellus dictum sodales
        dui, sed scelerisque mauris auctor et. Integer suscipit justo in erat
        tristique, nec feugiat augue ultrices. Sed accumsan pretium commodo.
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Ut lobortis tortor metus, sed rutrum risus ultricies non.
        Maecenas ultricies rutrum diam non feugiat. Nam ut ex ac enim efficitur
        semper.
      </p>
    );
  } else if (size === 'md') {
    return (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a sapien
          cursus, fringilla diam posuere, varius urna. Phasellus dictum sodales
          dui, sed scelerisque mauris auctor et. Integer suscipit justo in erat
          tristique, nec feugiat augue ultrices. Sed accumsan pretium commodo.
          Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Ut lobortis tortor metus, sed rutrum risus
          ultricies non. Maecenas ultricies rutrum diam non feugiat. Nam ut ex
          ac enim efficitur semper.
        </p>
        <p>
          Integer sed rhoncus eros. Nulla pharetra vulputate faucibus.
          Vestibulum vestibulum orci non maximus aliquet. Donec id dui ac ipsum
          pellentesque gravida sit amet non sem. Suspendisse malesuada turpis id
          erat porta, nec luctus odio mollis. Sed a arcu sed sem venenatis
          porta. In dictum sapien ut congue facilisis. Curabitur consequat
          vestibulum ultricies.
        </p>
        <p>
          Vivamus rhoncus vitae sapien id volutpat. Fusce ac nisi dolor.
          Suspendisse ut venenatis ex. Quisque elementum libero quam, non
          consectetur lorem faucibus a. Sed eu orci vitae nibh sodales sodales
          ut at neque. Ut lobortis arcu eu lorem porttitor scelerisque. Aenean
          euismod est ac enim fermentum, sit amet tristique dui consequat.
          Phasellus vitae sapien dolor. Nulla iaculis nibh at magna convallis
          finibus ut vitae ipsum.
        </p>
      </>
    );
  } else {
    return (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a sapien
        cursus, fringilla diam posuere, varius urna. Phasellus dictum sodales
        dui, sed scelerisque mauris auctor et. Integer suscipit justo in erat
        tristique, nec feugiat augue ultrices. Sed accumsan pretium commodo.
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Ut lobortis tortor metus, sed rutrum risus ultricies non.
        Maecenas ultricies rutrum diam non feugiat. Nam ut ex ac enim efficitur
        semper. Integer sed rhoncus eros. Nulla pharetra vulputate faucibus.
        Vestibulum vestibulum orci non maximus aliquet. Donec id dui ac ipsum
        pellentesque gravida sit amet non sem. Suspendisse malesuada turpis id
        erat porta, nec luctus odio mollis. Sed a arcu sed sem venenatis porta.
        In dictum sapien ut congue facilisis. Curabitur consequat vestibulum
        ultricies. Vivamus rhoncus vitae sapien id volutpat. Fusce ac nisi
        dolor. Suspendisse ut venenatis ex. Quisque elementum libero quam, non
        consectetur lorem faucibus a. Sed eu orci vitae nibh sodales sodales ut
        at neque. Ut lobortis arcu eu lorem porttitor scelerisque. Aenean
        euismod est ac enim fermentum, sit amet tristique dui consequat.
        Phasellus vitae sapien dolor. Nulla iaculis nibh at magna convallis
        finibus ut vitae ipsum. Maecenas ultricies ultrices diam laoreet
        lacinia. Nunc commodo eu lorem a bibendum. Sed eu magna rutrum,
        consectetur orci sit amet, venenatis ex. Aliquam sodales nec odio ac
        ultricies. In sit amet congue ipsum. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Phasellus
        accumsan justo nec maximus sollicitudin. Aenean eu urna egestas justo
        dignissim venenatis quis quis massa. Pellentesque convallis posuere
        elit, eu interdum diam placerat et. Aenean cursus vehicula nibh, in
        scelerisque nunc feugiat eu. Praesent eleifend ipsum eget urna dictum
        semper. Nullam dapibus nisl sit amet ultricies lobortis. Vestibulum a
        velit neque. Suspendisse tincidunt aliquet lorem et consectetur.
        Phasellus at libero fringilla nulla egestas aliquam. Nullam ut magna
        risus. Etiam consequat neque sapien, vel ultrices justo vehicula sit
        amet. Donec semper facilisis odio vel faucibus. Integer eget sagittis
        justo. Integer sed tincidunt neque. In vulputate fermentum lacus, eget
        sollicitudin nisi vestibulum vel. Etiam porttitor varius justo, id
        efficitur tellus congue a. Cras condimentum congue lectus sit amet
        commodo. Etiam lacus ex, efficitur volutpat enim id, malesuada posuere
        metus. Mauris convallis convallis arcu, sit amet placerat felis sodales
        ut. Duis semper a risus ac consequat. Nulla id nibh sem. Aliquam et
        nulla nec lectus viverra lobortis. Vivamus eros enim, lobortis nec
        efficitur nec, rhoncus at tortor. Aliquam aliquet bibendum ipsum eu
        feugiat. Duis iaculis bibendum ligula non ultricies. Curabitur cursus
        nulla in nisl tincidunt, eget eleifend tellus ultricies. Pellentesque
        eget mauris nec magna ultrices fringilla id sit amet nulla. Ut nec velit
        sed augue eleifend pharetra. Aliquam a posuere massa. Nunc vitae tortor
        ut est cursus vestibulum. In hac habitasse platea dictumst. Nulla eget
        orci eleifend, elementum turpis vitae, consectetur magna. In in nulla in
        tellus vestibulum pharetra. Curabitur at rhoncus enim, tempus congue
        est. Nullam consectetur lobortis nunc, vel feugiat lorem semper a. Ut
        tellus nulla, tempus id posuere vel, luctus et sem. Nulla nec rhoncus
        mi. Aenean sit amet mollis nibh. Nam ullamcorper tellus quis arcu
        aliquam, dignissim ultricies justo efficitur. Cras non ipsum tempor,
        elementum dui id, pellentesque turpis. Praesent commodo dolor in elit
        aliquet, sit amet pellentesque sem molestie. In pharetra nisl nec orci
        pellentesque, ut posuere quam faucibus. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Maecenas
        mollis purus non erat tempor euismod. Vestibulum non leo eget magna
        vestibulum mattis. Aenean vitae tortor vel mauris pretium tempor. Sed
        viverra eros tristique, dapibus tellus a, feugiat ipsum. Pellentesque
        non tellus scelerisque, molestie massa vitae, fermentum ex. Quisque
        molestie interdum nibh a luctus. Sed aliquet risus ac varius suscipit.
        Proin eget leo vel lacus finibus posuere vel non nisl. In tristique
        ligula leo, sed molestie sem sodales nec. Phasellus sed consectetur
        lectus. In pretium hendrerit eros, a sagittis est faucibus ac. Etiam
        faucibus felis et eros commodo fringilla. Duis volutpat lobortis
        suscipit. Maecenas facilisis metus in lorem aliquet efficitur. Duis
        scelerisque eros scelerisque, rhoncus massa eget, tempor ipsum. Donec id
        feugiat purus, non condimentum turpis. Sed consequat lorem a odio
        pharetra pretium. Proin sed turpis ac sapien convallis iaculis a sit
        amet est. Proin lorem risus, rhoncus non metus at, fringilla commodo
        erat. Sed quis elit vitae leo ullamcorper interdum non nec ipsum. Etiam
        ullamcorper lorem ac velit condimentum, eget porttitor odio mollis.
        Maecenas semper, urna eu cursus placerat, enim neque aliquam orci, ut
        elementum justo ex id justo. Nunc malesuada egestas dui at vestibulum.
      </p>
    );
  }
}

export function sampleTableContent() {
  return {
    tableHeaders: [
      {
        label: 'Name',
      },
      {
        label: 'Last modified',
      },
    ],
    items: [
      {
        displayName: 'Persnickety.pdf',
        updated: 'Jul 28, 2021',
      },
      {
        displayName: 'Albumen.pdf',
        updated: 'Jul 20, 2021',
      },
      {
        displayName: 'Yams-and-sauce.pdf',
        updated: 'Aug 04, 2021',
      },
      {
        displayName: 'Coneflowers-and-their-allies.pdf',
        updated: 'Aug 01, 2021',
      },
      {
        displayName: 'Dollars-and-sense.pdf',
        updated: 'Aug 22, 2021',
      },
      {
        displayName: 'Mendicant Friars.PDF',
        updated: 'Jul 20, 2021',
      },
      {
        displayName: 'Paleogeography.pdf',
        updated: 'Aug 04, 2021',
      },
      {
        displayName: 'Foregone conclusions.pdf',
        updated: 'Aug 01, 2021',
      },
      {
        displayName: 'Forklifts-and-bananas.pdf',
        updated: 'Aug 01, 2021',
      },
      {
        displayName: 'Coracles.pdf',
        updated: 'Aug 05, 2021',
      },
    ],
  };
}

export function nabokovNovels() {
  return [
    {
      title: 'Машенька',
      year: '1926',
      language: 'Russian',
      translatedTitle: 'Mary',
    },
    {
      title: 'Король, дама, валет',
      year: '1928',
      language: 'Russian',
      translatedTitle: 'King, Queen, Knave',
    },
    {
      title: 'Защита Лужина',
      year: '1930',
      language: 'Russian',
      translatedTitle: 'The Defense',
    },
    {
      title: 'Соглядатай',
      year: '1930',
      language: 'Russian',
      translatedTitle: 'The Eye',
    },
    {
      title: 'The Real Life of Sebastian Knight',
      year: '1941',
      language: 'English',
    },
    {
      title: 'Bend Sinister',
      year: '1947',
      language: 'English',
    },
    {
      title: 'Pale Fire',
      year: '1965',
      language: 'English',
    },
    {
      title: 'Подвиг',
      year: '1932',
      language: 'Russian',
      translatedTitle: 'Glory',
    },
    {
      title: 'Ada or Ardor: A Family Chronicle',
      year: '1969',
      language: 'English',
    },
  ];
}
