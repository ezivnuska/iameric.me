const verticalMargin = 10
const verticalPadding = 10
const horizontalPadding = 10
const horizontalMargin = 10

const full = {
    marginVertical: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: '#eee',
}

const margin = {
    marginVertical: 0,
    marginHorizontal: 0,
    paddingVertical: verticalPadding,
    paddingHorizontal: horizontalPadding,
    // backgroundColor: '#ddd',
}

const expanded = {
    marginVertical: verticalMargin,
    marginHorizontal: horizontalMargin / 2,
    paddingVertical: 0,//verticalPadding,
    paddingHorizontal: 0,//horizontalPadding / 2,
    borderWidth: 1,
    backgroundColor: '#ccc',
}

export default {
    verticalMargin,
    verticalPadding,
    horizontalPadding,
    horizontalMargin,
    expanded,
    full,
    margin,
}