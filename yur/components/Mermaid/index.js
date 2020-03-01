let graphIdCounter = 0

export default {
  name: 'Mermaid',
  data () {
    let graph = ''
    if (this.$slots.default) {
      graph = this.$slots.default[0].text
    }

    return {
      svg: undefined,
      graph,
    }
  },
  render (h) {
    return h('div', { domProps: { innerHTML: this.svg } })
  },
  methods: {
    renderSVG () {
      import('mermaid/dist/mermaid').then(mermaid => {
        mermaid.initialize({
          theme: 'default',
          logLevel: 'fatal',
          securityLevel: 'strict',
          startOnLoad: true,
          arrowMarkerAbsolute: false,
          flowchart: {
            htmlLabels: true,
            curve: 'linear',
          },
          sequence: {
            diagramMarginX: 50,
            diagramMarginY: 10,
            actorMargin: 50,
            width: 150,
            height: 65,
            boxMargin: 10,
            boxTextMargin: 5,
            noteMargin: 10,
            messageMargin: 35,
            mirrorActors: true,
            bottomMarginAdj: 1,
            useMaxWidth: true,
            rightAngles: false,
            showSequenceNumbers: false,
          },
          gantt: {
            titleTopMargin: 25,
            barHeight: 20,
            barGap: 4,
            topPadding: 50,
            leftPadding: 75,
            gridLineStartPadding: 35,
            fontSize: 11,
            fontFamily: '"Open-Sans", "sans-serif"',
            numberSectionStyles: 4,
            axisFormat: '%Y/%m/%d',
          },
        })

        const renderDiv = document.createElement('div')
        document.body.appendChild(renderDiv)

        mermaid.render(
          'mermaid' + ++graphIdCounter,
          this.graph,
          (svg) => {
            this.svg = svg
            document.body.removeChild(renderDiv)
          },
          renderDiv,
        )
      })
    },
  },
  mounted () {
    if (this.graph.length > 0) {
      this.renderSVG()
    }
  },
}
