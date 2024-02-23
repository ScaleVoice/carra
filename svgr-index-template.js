const path = require('path');

function defaultIndexTemplate(filePaths) {
  const paths = filePaths.map(p => p.path);
  const isCountryFolder = paths.some(path => {
    console.log('path', path);
    return path.includes('icons/country/');
  });
  const prefix = isCountryFolder ? 'Country' : '';

  const icons = paths.map(filePath => {
    const fileName = path.basename(filePath, path.extname(filePath));
    const name = isCountryFolder ? fileName.toUpperCase() : fileName;
    return { name: isCountryFolder ? name.toUpperCase() : name, fileName };
  });

  const iconNamesWithQuotes = icons.map(({ name }) => `'${name}'`);

  const importEntries = icons.map(({ name, fileName }) => {
    return `import ${name} from './${fileName}'`;
  });

  return `
  /* eslint-disable max-lines */
  /* eslint-disable curly */
  import { forwardRef, Ref } from 'react'

  ${importEntries.join('\n')}

  export type ${prefix}IconName = ${iconNamesWithQuotes.join(' | ')}

  const icons = {
    ${icons.map(icon => icon.name).join(',\n')}
  }

  export const ${prefix.toLowerCase()}IconNameSet = new Set(Object.keys(icons))

  export interface ${prefix}IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
    name: ${prefix}IconName
    size?: number | string
  }

  const _Icon = (props: ${prefix}IconProps, ref: Ref<SVGSVGElement>) => {
    const { name, size = '1.25rem', width, height, ...rest } = props

    const IconComponent = icons[name]

    if (!IconComponent) return null
    return <IconComponent aria-label={name} width={width ?? size} height={height ?? size} style={{ flexShrink: 0 }} {...rest} ref={ref} />
  }

  export const ${prefix}Icon = forwardRef(_Icon)
  `;
}

module.exports = defaultIndexTemplate;
