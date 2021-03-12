import XForm from '@perish/react-xform'
import transformer from './transformer'
import extractor from './extractor'
import composer from './composer'

//验证基本功能
export default function TestCase() {
  return (
    <div>
      <XForm
        schema={{
          type: 'array',
          template: {
            type: 'array',
            template: {
              type: 'array',
              template: {
                type: 'string',
                title: 'item',
              },
            },
          },
        }}
        formData={[]}
        transformer={transformer}
        extractor={extractor}
        composer={composer}
        onChange={console.log}
        // onChange={console.log}
      />
    </div>
  )
}
