import * as Scrivito from 'scrivito'
import { CardWidget } from './CardWidgetClass'

Scrivito.provideComponent(CardWidget, ({ widget }) => {
  const backgroundImage = widget.get('backgroundImage')
  const backgroundImageClassNames = ['img-background']
  if (widget.get('backgroundAnimateOnHover')) {
    backgroundImageClassNames.push('img-zoom')
  }

  const image = widget.get('image')

  return (
    <OuterCardTag widget={widget}>
      {backgroundImage && (
        <Scrivito.InPlaceEditingOff>
          <Scrivito.ImageTag
            content={widget}
            attribute="backgroundImage"
            className={backgroundImageClassNames.join(' ')}
          />
        </Scrivito.InPlaceEditingOff>
      )}
      {image && (
        <Scrivito.InPlaceEditingOff>
          <Scrivito.ImageTag
            content={widget}
            attribute="image"
            className="img-box img-h-200"
          />
        </Scrivito.InPlaceEditingOff>
      )}
      <Scrivito.ContentTag
        content={widget}
        attribute="cardBody"
        className="card-body"
      />
      {widget.get('showFooter') && (
        <Scrivito.ContentTag
          content={widget}
          attribute="cardFooter"
          className="card-footer"
        />
      )}
    </OuterCardTag>
  )
})

const OuterCardTag = Scrivito.connect(
  ({
    children,
    widget,
  }: {
    children: React.ReactNode
    widget: InstanceType<typeof CardWidget>
  }) => {
    const cardClassNames: string[] = ['card']

    const backgroundColor = widget.get('backgroundColor')
    if (backgroundColor && backgroundColor !== 'transparent') {
      cardClassNames.push(`bg-${backgroundColor}`)
    }

    if (widget.get('cardExtended')) cardClassNames.push('card-extended')

    const link = widget.get('linkTo')

    if (link && !Scrivito.isInPlaceEditingActive()) {
      return (
        <Scrivito.LinkTag to={link} className={cardClassNames.join(' ')}>
          {children}
        </Scrivito.LinkTag>
      )
    }

    return <div className={cardClassNames.join(' ')}>{children}</div>
  }
)
