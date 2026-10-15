import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  computed,
  signal,
} from '@angular/core';

interface CampaignEvent {
  year: string;
  month: string;
  kicker: string;
  title: string;
  description: string;
  places: string[];
  front: string;
  detail: string[];
}

interface MapPlace {
  id: string;
  label: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
}

interface AtlasArticle {
  title: string;
  detail: string;
  keywords: string;
  dialog: DialogKey;
  eventIndex?: number;
}

interface DialogContent {
  kicker: string;
  title: string;
  paragraphs: string[];
}

type DialogKey =
  | 'event'
  | 'territory'
  | 'voices'
  | 'communities'
  | 'aftermath'
  | 'sources';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnDestroy {
  @ViewChild('contentDialog') private contentDialog?: ElementRef<HTMLDialogElement>;
  @ViewChild('searchDialog') private searchDialog?: ElementRef<HTMLDialogElement>;
  @ViewChild('searchInput') private searchInput?: ElementRef<HTMLInputElement>;

  protected readonly events: CampaignEvent[] = [
    {
      year: '1932',
      month: 'JUNIO — OCTUBRE',
      kicker: 'EL INICIO DEL CONFLICTO',
      title: 'La guerra comienza en los fortines',
      description:
        'La toma del fortín Carlos Antonio López, conocido como Pitiantuta, desata la escalada entre Bolivia y Paraguay. Meses después, el prolongado sitio de Boquerón termina con la retirada boliviana.',
      places: ['pitiantuta', 'boqueron'],
      front: 'M199 190 C247 210 266 242 315 256 S376 289 397 324',
      detail: [
        'El 15 de junio de 1932, fuerzas paraguayas ocuparon el fortín boliviano Carlos Antonio López, conocido como Pitiantuta. La crisis que siguió aceleró la movilización de ambos países.',
        'Boquerón, ocupado por fuerzas bolivianas en julio, fue cercado por el ejército paraguayo. Tras semanas de combates y escasez de agua y suministros, la guarnición boliviana se rindió el 29 de septiembre de 1932.',
        'La disputa por los fortines fronterizos se transformó en una guerra abierta. Las causas incluían la indefinición de límites, intereses estratégicos y expectativas sobre los recursos del Chaco Boreal.',
      ],
    },
    {
      year: '1933',
      month: 'DICIEMBRE',
      kicker: 'UN CAMBIO EN LA CAMPAÑA',
      title: 'Campo Vía: un ejército cercado',
      description:
        'En diciembre, una maniobra paraguaya cerca de Campo Vía rodea a dos divisiones bolivianas. La capitulación de miles de soldados cambia el curso de la campaña.',
      places: ['campo-via'],
      front: 'M168 204 C218 223 251 242 282 254 S329 272 354 292',
      detail: [
        'Entre el 10 y el 11 de diciembre de 1933, las fuerzas paraguayas cerraron un cerco en la zona de Campo Vía. Dos divisiones bolivianas quedaron rodeadas y se produjo una capitulación de gran escala.',
        'El resultado fue un punto de inflexión militar y político. Tras el desastre, el presidente boliviano Daniel Salamanca relevó al alto mando y asumió Enrique Peñaranda.',
        'Las cifras de prisioneros y bajas varían entre las fuentes. La operación mostró cómo el conocimiento del terreno, la movilidad y la logística podían decidir una campaña.',
      ],
    },
    {
      year: '1934',
      month: 'MAYO — DICIEMBRE',
      kicker: 'EL AÑO DECISIVO',
      title: 'La defensa de Cañada Strongest',
      description:
        'Bolivia logra una importante victoria defensiva en Cañada Strongest. Hacia finales de año, los combates alcanzan las cercanías de Villamontes.',
      places: ['canada-strongest'],
      front: 'M148 170 C194 183 230 196 271 210 S322 225 353 244',
      detail: [
        'A fines de mayo de 1934, las fuerzas bolivianas derrotaron a unidades paraguayas en la zona de Cañada Strongest, en una de las victorias bolivianas más destacadas de la guerra.',
        'Durante el segundo semestre, el ejército paraguayo avanzó hacia el oeste y amenazó centros estratégicos bolivianos. Los combates de diciembre en El Carmen y Picuiba profundizaron la crisis boliviana.',
        'La resistencia en el entorno de Villamontes frenó el avance paraguayo. La campaña se acercaba a sus límites logísticos mientras aumentaba la presión internacional para negociar.',
      ],
    },
    {
      year: '1935',
      month: 'JUNIO',
      kicker: 'SILENCIO EN EL FRENTE',
      title: 'El armisticio detiene los combates',
      description:
        'Tras la batalla de Ingavi y la contraofensiva boliviana en la zona de Villamontes, el agotamiento de ambos ejércitos abre paso a las negociaciones.',
      places: ['villamontes'],
      front: 'M116 135 C158 148 199 160 237 171 S276 183 303 198',
      detail: [
        'El 12 de junio de 1935 entró en vigor el protocolo de armisticio. Puso fin a tres años de guerra y detuvo los enfrentamientos, aunque la frontera definitiva todavía debía negociarse.',
        'Las conversaciones de paz se desarrollaron con mediación internacional. La guerra dejó a miles de personas muertas, heridas o desplazadas; las estimaciones de víctimas varían significativamente según las fuentes.',
        'La posguerra trajo el retorno de prisioneros y una larga negociación diplomática que culminó en el tratado firmado en Buenos Aires en 1938.',
      ],
    },
    {
      year: '1938',
      month: 'JULIO',
      kicker: 'UNA PAZ, UNA FRONTERA',
      title: 'El tratado que cerró la disputa',
      description:
        'Bolivia y Paraguay firman en Buenos Aires el Tratado de Paz, Amistad y Límites. El acuerdo establece la frontera y cierra formalmente la disputa territorial.',
      places: [],
      front: 'M122 119 C164 136 194 153 221 177 S248 202 268 224',
      detail: [
        'El 21 de julio de 1938, Bolivia y Paraguay firmaron en Buenos Aires el Tratado de Paz, Amistad y Límites, con participación de los países mediadores.',
        'El acuerdo estableció la frontera entre ambos países y concluyó formalmente la controversia territorial que había originado el conflicto. La demarcación se completó después mediante comisiones mixtas.',
        'La guerra pertenece a la memoria compartida de Bolivia y Paraguay. Su estudio también requiere atender las experiencias de las comunidades indígenas del Chaco, cuyas tierras y formas de vida fueron afectadas.',
      ],
    },
  ];

  protected readonly places: MapPlace[] = [
    { id: 'pitiantuta', label: 'PITIANTUTA', x: 235, y: 125, labelX: 248, labelY: 120 },
    { id: 'boqueron', label: 'BOQUERÓN', x: 188, y: 222, labelX: 200, labelY: 216 },
    { id: 'campo-via', label: 'CAMPO VÍA', x: 294, y: 260, labelX: 306, labelY: 253 },
    {
      id: 'canada-strongest',
      label: 'CAÑADA STRONGEST',
      x: 273,
      y: 177,
      labelX: 285,
      labelY: 171,
    },
    { id: 'villamontes', label: 'VILLAMONTES', x: 122, y: 119, labelX: 77, labelY: 107 },
  ];

  private readonly articles: AtlasArticle[] = [
    {
      title: 'El comienzo de la guerra',
      detail: 'Pitiantuta · Boquerón · 1932',
      keywords: 'pitiantuta boqueron boquerón fortin fortín comienzo 1932',
      dialog: 'event',
      eventIndex: 0,
    },
    {
      title: 'Campo Vía: el cerco',
      detail: 'Campaña de 1933',
      keywords: 'campo via vía cerco prisioneros 1933',
      dialog: 'event',
      eventIndex: 1,
    },
    {
      title: 'Cañada Strongest',
      detail: 'Una victoria boliviana · 1934',
      keywords: 'canada cañada strongest batalla bolivia 1934',
      dialog: 'event',
      eventIndex: 2,
    },
    {
      title: 'El armisticio',
      detail: 'Fin de los combates · 1935',
      keywords: 'armisticio paz fin guerra 1935 villamontes',
      dialog: 'event',
      eventIndex: 3,
    },
    {
      title: 'El tratado de 1938',
      detail: 'Buenos Aires · Paz y límites',
      keywords: 'tratado 1938 limites límites buenos aires',
      dialog: 'aftermath',
    },
    {
      title: 'El Gran Chaco',
      detail: 'Territorio, clima y distancias',
      keywords: 'territorio mapa gran chaco clima rios ríos',
      dialog: 'territory',
    },
    {
      title: 'Los pueblos del Chaco',
      detail: 'Comunidades indígenas',
      keywords: 'pueblos comunidades indígenas territorio',
      dialog: 'communities',
    },
    {
      title: 'Cartas desde el frente',
      detail: 'Voces y memoria',
      keywords: 'cartas voces memoria testimonios soldados',
      dialog: 'voices',
    },
  ];

  private readonly staticDialogs: Record<Exclude<DialogKey, 'event'>, DialogContent> = {
    territory: {
      kicker: 'EL ESCENARIO',
      title: 'Un territorio difícil de atravesar',
      paragraphs: [
        'El Chaco Boreal es una extensa región de llanuras, monte seco y cursos de agua estacionales, entre los ríos Paraguay y Pilcomayo. La escasez de agua, las altas temperaturas, la vegetación densa y las grandes distancias condicionaron las operaciones.',
        'Los fortines eran puestos aislados y el abastecimiento dependía de largas líneas de transporte. Las enfermedades y la sed causaron un enorme sufrimiento a los combatientes.',
        'Este mapa es esquemático: representa lugares relevantes de la campaña, no las fronteras históricas exactas ni el movimiento completo de los frentes.',
      ],
    },
    voices: {
      kicker: 'PERSONAS Y MEMORIA',
      title: 'Cartas desde el frente',
      paragraphs: [
        'Cartas, diarios y testimonios permiten acercarse a la experiencia cotidiana de quienes vivieron la guerra. Junto a los partes militares, estas fuentes hablan de la sed, las enfermedades, la distancia de las familias y la incertidumbre.',
        'Los documentos personales expresan experiencias individuales y no representan por sí solos a todos los combatientes. Una lectura cuidadosa los sitúa en su contexto y los contrasta con otras fuentes.',
      ],
    },
    communities: {
      kicker: 'TERRITORIO VIVO',
      title: 'Los pueblos del Chaco',
      paragraphs: [
        'El Chaco era y es hogar de numerosas comunidades indígenas, entre ellas los pueblos Guaraní, Nivaclé, Enlhet, Ayoreo y Qom. Sus historias, lenguas y vínculos con el territorio son anteriores a las fronteras nacionales.',
        'La guerra alteró la vida de las comunidades: hubo desplazamientos, trabajo forzado y cambios profundos en el acceso a sus territorios. Sus experiencias no pueden reducirse a las de los ejércitos que combatieron.',
        'La documentación histórica sobre estos efectos es desigual. Para ampliar esta historia, es importante consultar también investigaciones y testimonios producidos por las propias comunidades.',
      ],
    },
    aftermath: {
      kicker: 'DESPUÉS DE LA GUERRA',
      title: 'Del armisticio al tratado',
      paragraphs: [
        'El armisticio del 12 de junio de 1935 detuvo los combates, pero no resolvió de inmediato la cuestión limítrofe. Las negociaciones se prolongaron durante tres años con mediación internacional.',
        'El 21 de julio de 1938, Bolivia y Paraguay firmaron en Buenos Aires el Tratado de Paz, Amistad y Límites. Una comisión mixta se encargó posteriormente de demarcar la frontera.',
        'La paz formal fue el comienzo de una larga posguerra para las personas que regresaban, las familias afectadas y las comunidades del Chaco.',
      ],
    },
    sources: {
      kicker: 'PARA SEGUIR INVESTIGANDO',
      title: 'Fuentes y bibliografía',
      paragraphs: [
        'Esta introducción presenta una síntesis educativa. Las cifras de bajas, prisioneros y población afectada difieren entre estudios y se presentan aquí con cautela.',
        'Fuentes recomendadas para profundizar:',
        '• Bruce W. Farcau, The Chaco War: Bolivia and Paraguay, 1932–1935 (1996).',
        '• Leslie B. Rout Jr., Politics of the Chaco Peace Conference, 1935–1939 (1970).',
        '• David H. Zook Jr., The Conduct of the Chaco War (1960).',
        '• Tratado de Paz, Amistad y Límites entre Bolivia y Paraguay, Buenos Aires, 21 de julio de 1938.',
        'El mapa y los textos de esta experiencia son recursos didácticos; el mapa no es una cartografía de límites oficiales.',
      ],
    },
  };

  private readonly selectedIndexState = signal(0);
  private readonly searchQueryState = signal('');
  private readonly dialogContentState = signal<DialogContent | null>(null);
  private readonly playbackState = signal(false);
  private readonly toastState = signal('');
  private readonly speechState = signal(false);
  private readonly speechSourceState = signal<'intro' | 'dialog' | null>(null);

  protected readonly selectedIndex = this.selectedIndexState.asReadonly();
  protected readonly searchQuery = this.searchQueryState.asReadonly();
  protected readonly dialogContent = this.dialogContentState.asReadonly();
  protected readonly isPlaying = this.playbackState.asReadonly();
  protected readonly toastMessage = this.toastState.asReadonly();
  protected readonly speechActive = this.speechState.asReadonly();
  protected readonly speechSource = this.speechSourceState.asReadonly();
  protected readonly selectedEvent = computed(
    () => this.events[this.selectedIndexState()],
  );
  protected readonly filteredArticles = computed(() => {
    const query = this.searchQueryState().trim().toLocaleLowerCase('es');
    return this.articles.filter(
      (article) =>
        !query ||
        `${article.title} ${article.detail} ${article.keywords}`
          .toLocaleLowerCase('es')
          .includes(query),
    );
  });

  private playbackTimer?: number;
  private toastTimer?: number;
  private currentUtterance?: SpeechSynthesisUtterance;

  @HostListener('document:keydown', ['$event'])
  protected handleShortcut(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.openSearch();
    }
  }

  protected selectEvent(index: number): void {
    if (index < 0 || index >= this.events.length) {
      return;
    }
    this.selectedIndexState.set(index);
  }

  protected showPlace(place: MapPlace): void {
    const index = this.events.findIndex((item) => item.places.includes(place.id));
    if (index < 0) {
      return;
    }
    this.selectEvent(index);
    document.getElementById('cronologia')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    this.showToast(`${this.events[index].title} · ${this.events[index].year}`);
  }

  protected togglePlayback(): void {
    if (this.playbackState()) {
      this.stopPlayback();
      return;
    }
    if (this.selectedIndexState() === this.events.length - 1) {
      this.selectEvent(0);
    }
    this.playbackState.set(true);
    this.playbackTimer = window.setInterval(() => {
      const nextIndex = this.selectedIndexState() + 1;
      if (nextIndex === this.events.length) {
        this.stopPlayback();
        return;
      }
      this.selectEvent(nextIndex);
    }, 3500);
  }

  protected openDialog(key: DialogKey): void {
    const content =
      key === 'event'
        ? {
            kicker: this.selectedEvent().kicker,
            title: this.selectedEvent().title,
            paragraphs: this.selectedEvent().detail,
          }
        : this.staticDialogs[key];
    this.dialogContentState.set(content);
    this.contentDialog?.nativeElement.showModal();
  }

  protected openSearch(): void {
    const searchDialog = this.searchDialog?.nativeElement;
    if (!searchDialog || searchDialog.open) {
      return;
    }
    searchDialog.showModal();
    this.searchQueryState.set('');
    this.searchInput?.nativeElement.focus();
  }

  protected updateSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.searchQueryState.set(event.target.value);
    }
  }

  protected openSearchResult(article: AtlasArticle): void {
    this.searchDialog?.nativeElement.close();
    if (article.eventIndex !== undefined) {
      this.selectEvent(article.eventIndex);
    }
    this.openDialog(article.dialog);
  }

  protected onContentDialogClose(): void {
    this.stopSpeech();
    this.dialogContentState.set(null);
  }

  protected onSearchDialogClose(): void {
    this.searchQueryState.set('');
  }

  protected toggleSpeech(source: 'intro' | 'dialog'): void {
    if (!('speechSynthesis' in window)) {
      this.showToast('La narración de voz no está disponible en este navegador.');
      return;
    }
    if (this.speechState()) {
      this.stopSpeech();
      return;
    }
    const text =
      source === 'intro'
        ? 'La Guerra del Chaco enfrentó a Bolivia y Paraguay entre 1932 y 1935 por el control del Chaco Boreal. En este atlas puedes recorrer los principales momentos del conflicto, explorar el territorio y conocer algunas de las voces y comunidades afectadas. La guerra terminó con un armisticio en 1935 y un tratado de paz en 1938.'
        : `${this.dialogContentState()?.title ?? ''}. ${this.dialogContentState()?.paragraphs.join(' ') ?? ''}`;
    this.stopSpeech();
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.lang = 'es';
    this.currentUtterance.rate = 0.94;
    this.currentUtterance.onend = () => this.stopSpeech();
    this.currentUtterance.onerror = () => {
      this.stopSpeech();
      this.showToast('No se pudo reproducir la narración. Inténtalo de nuevo.');
    };
    this.speechState.set(true);
    this.speechSourceState.set(source);
    window.speechSynthesis.speak(this.currentUtterance);
  }

  private stopSpeech(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.speechState.set(false);
    this.speechSourceState.set(null);
    this.currentUtterance = undefined;
  }

  private stopPlayback(): void {
    if (this.playbackTimer !== undefined) {
      window.clearInterval(this.playbackTimer);
      this.playbackTimer = undefined;
    }
    this.playbackState.set(false);
  }

  private showToast(message: string): void {
    if (this.toastTimer !== undefined) {
      window.clearTimeout(this.toastTimer);
    }
    this.toastState.set(message);
    this.toastTimer = window.setTimeout(() => {
      this.toastState.set('');
      this.toastTimer = undefined;
    }, 3600);
  }

  ngOnDestroy(): void {
    this.stopPlayback();
    this.stopSpeech();
    if (this.toastTimer !== undefined) {
      window.clearTimeout(this.toastTimer);
    }
  }
}
