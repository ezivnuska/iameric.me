const verticalMargin = 10
const verticalPadding = 10
const horizontalPadding = 10
const horizontalMargin = 10

const full = {
    marginVertical: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
}

const margin = {
    marginVertical: 0,
    marginHorizontal: 0,
    paddingVertical: verticalPadding,
    paddingHorizontal: horizontalPadding,
    // backgroundColor: 'yellow',
    // borderWidth: 2,
    // borderStyle: 'dashed',
}

const expanded = {
    marginBottom: verticalMargin,
    marginHorizontal: horizontalMargin / 2,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderBottomWidth: 0,
    // backgroundColor: '#ccc',
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