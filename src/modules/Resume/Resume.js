import React from 'react'
import { Text, View } from 'react-native'
import { ThemedText } from '@components'
import Icon from 'react-native-vector-icons/Ionicons'
import { useApp } from '@app'

const jobs = [
    {
        company: 'Eveo',
        city: 'San Francisco',
        start: '2015',
        end: '2015',
        duration: '5 months',
        title: 'Frontend Developer',
        bullets: [
            'Built banner ads using Flash/Actionscript',
            'Wrote Jade templates for mobile app',
            'Built microsite for use in 3rd party iPad software',
        ],
    },
    {
        company: 'Krafted By Us',
        city: 'Martinez',
        start: '2015',
        end: '2015',
        duration: '2 months',
        title: 'Frontend Developer',
        bullets: [
            'Built microsite with Node, Gulp and Sass/Bourbon',
        ],
    },
    {
        company: 'Pixelette Studios',
        city: 'Berkeley',
        start: '2014',
        end: '2015',
        duration: '1 year, 2 months',
        title: 'Actionscript Developer',
        bullets: [
            'Built expandable and polite-loading rich-media creatives for DoubleClick and MediaMind (now Sizemek) platforms',
        ],
    },
    {
        company: 'Cibo Studios',
        city: 'San Francisco',
        start: '2013',
        end: '2013',
        duration: '1 month',
        title: 'Actionscript Developer',
        bullets: [
            'Built expandable rich-media creatives using Actionscript on DoubleClick platform',
        ],
    },
    {
        company: 'Storefront Political Media',
        city: 'San Francisco',
        start: '2013',
        end: '2013',
        duration: '1 month',
        title: 'Actionscript Developer',
        bullets: [
            'Built Flash banner ads in various sizes',
        ],
    },
    {
        company: 'Creative Lift',
        city: 'San Francisco',
        start: '2010',
        end: '2012',
        duration: '2 years',
        title: 'Frontend and iPhone Developer',
        bullets: [
            'Maintained and facilitated updates and promotions for Flash application created with AS3 and PureMVC framework which allowed customers to order localized cable, internet and telephone service bundles',
            'Built the Lift Calculator, a simple app for iPhone, for calculating the response rate for marketing campaigns and comparing them to industry averages.',
            'Built Flash banners for various clients',
            'Built landing pages and email campaigns',
        ],
    },
    {
        company: 'Teak Motion Visuals',
        city: 'San Francisco',
        start: '2010',
        end: '2010',
        duration: '4 months',
        title: 'Actionscript Developer',
        bullets: [
            'Built Flash banner campaigns',
        ],
    },
    {
        company: 'Attik',
        city: 'San Francisco',
        start: '2010',
        end: '2010',
        duration: '4 months',
        title: 'Actionscript Developer',
        bullets: [
            'Built XML driven interactive expandable rich media Flash banners for online reality show',
        ],
    },
    {
        company: 'Eleven',
        city: 'San Francisco',
        start: '2010',
        end: '2010',
        duration: '2 months',
        title: 'Actionscript Developer',
        bullets: [
            'Built standard and expandable interactive Flash banners',
        ],
    },
    {
        company: 'Eveo',
        city: 'San Francisco',
        start: '2008',
        end: '2009',
        duration: '4 months',
        title: 'Actionscript Developer',
        bullets: [
            'Built 3 Flash interactive video case studies to be used as marketing materials for pharmaceutical companies',
        ],  
    },
    {
        company: 'Graphic Language',
        city: 'San Francisco',
        start: '2006',
        end: '2008',
        duration: '2 years',
        title: 'Lead Frontend Developer',
        bullets: [
            'Built all client web sites using HTML, CSS, JavaScript, and ActionScript',
            'Built email templates for a CMS-based email software',
        ],
    },
    {
        company: 'Illuminotion',
        city: 'Berkeley',
        start: '2001',
        end: '2006',
        duration: '5 years',
        title: 'Lead Frontend Developer',
        bullets: [
            'Built all client sites and landing pages using HTML, CSS, Javascript, and Flash',
        ],
    }
]

const Company = ({ name }) => (
    <View>
        <ThemedText bold size={18}>{name}</ThemedText>
    </View>
)

const Title = ({ title }) => (
    <View>
        <ThemedText bold color='tomato' size={18}>{title}</ThemedText>
    </View>
)

const City = ({ city }) => (
    <View>
        <ThemedText size={18} color='#777'>{city}</ThemedText>
    </View>
)

const Time = ({ start, end }) => {
    const string = start === end ? start : `${start}-${end.substring(2)}`
    return (
        <View>
            <ThemedText size={18} color='#777'>{string}</ThemedText>
        </View>
    )
}

const BulletListItem = ({ text, ...props }) => {
    const { theme } = useApp()
    return (
        <View
            key={props.key}
            style={{
                flexDirection: 'row',
                gap: 5,
                flexShrink: 1,
            }}
        >

            <View style={{ flexGrow: 0, marginTop: 5 }}>
                <Icon
                    name={'chevron-forward'}
                    size={16}
                    color={theme?.colors.textDefault}
                />
            </View>

            <View style={{ flexShrink: 1 }}>
                <ThemedText>{text}</ThemedText>
            </View>
        </View>
    )
}

const BulletedList = ({ items, listKey }) => (
    <View
        style={{
            gap: 10,
            marginHorizontal: 7,
            marginTop: 5,
        }}
    >
        {items.map((text, index) => (
            <BulletListItem
                text={text}
                key={`${listKey}-${index}`}
            />
        ))}
    </View>
)

const Job = ({ section, ...props }) => {
    const { company, city, start, end, title } = section
    return (
        <View
            key={props.key}
            style={{ gap: 3 }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    gap: 10,
                    background: '#eee',
                    paddingHorizontal: 7,
                    paddingVertical: 3,
                    marginBottom: 5,
                }}
            >
                <Company name={company} />
                <City city={city} />
            </View>
            
            <View
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    gap: 10,
                    paddingHorizontal: 7,
                }}
            >
                <Title title={title} />
                <Time start={start} end={end} />
            </View>

            <BulletedList items={section.bullets} listKey={props.key} />
        </View>
    )
}

const JobList = () => jobs.map((section, index) => <Job section={section} key={`section-${index}`} />) 

const Intro = () => (
    <View
        style={{
            marginVertical: 10,
        }}
    >
        <View
            style={{
                flexDirection: 'row',
                gap: 7,
            }}
        >
            <View style={{ flexGrow: 0, flexDirection: 'row', gap: 5 }}>
                <ThemedText bold size={18}>I am</ThemedText>
                <View style={{ flexGrow: 0, flexDirection: 'row' }}>
                    <ThemedText bold size={18} color='tomato'>Eric</ThemedText>
                    <ThemedText bold size={18}>.</ThemedText>
                </View>
            </View>

            <View style={{ flexGrow: 0 }}>
                <ThemedText size={18}>Welcome to my project.</ThemedText>
            </View>
        </View>
    </View>
)

export default () => (
    <View
        style={{
            gap: 10,
            marginBottom: 100,
        }}
    >
        <Intro />
        <JobList />
    </View>
)