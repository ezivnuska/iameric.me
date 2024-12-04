import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ScreenHeader, DefaultText } from '@components'
import { BugList, BugNavBar } from './components'
import { BugModal, useBugs } from '.'
import { useSocket } from '@socket'
import { createEntry, deleteEntryWithId } from './utils'

const BugContainer = props => {

    const {
        addBug,
        deleteBug,
        bugs,
        bugModal,
        closeBugModal,
        setBugModal,
        setBugsLoading,
    } = useBugs()

    const { socket } = useSocket()

    const [ sortedThreads, setSortedThreads ] = useState([])

    useEffect(() => {
        socket.on('new_entry', addBug)
        socket.on('deleted_entry', deleteBug)
    }, [])

    useEffect(() => {
        if (bugs) {
            const threads = getSortedThreads()
            setSortedThreads(threads)
        }
    }, [bugs])

    const getThreadIds = () => {
        let ids = []
        bugs.map(bug => {
            if (ids.indexOf(bug._id) < 0) {
                ids.push(bug._id)
            }
        })
        return ids
    }

    const getSortedThreads = () => {
        const threadIds = getThreadIds()
        const threads = []
        threadIds.map(threadId => {

            const thread = bugs.filter(bug => (bug.threadId && bug.threadId === threadId) || (!bug.threadId && bug._id === threadId))
            
            if (thread.length) {
                threads.push(thread.reverse())
            }
        })
        return threads
    }

    const removeBug = async id => {
        setBugsLoading(true)
        await deleteEntryWithId(id)
        setBugsLoading(false)
        socket.emit('entry_deleted', id)
        deleteBug(id)
        closeBugModal()
    }

    const handleSubmit = async data => {
        const bug = await createEntry(data)
        addBug(bug)
        socket.emit('new_entry', bug)
        closeBugModal()
        // return bug
    }

    const renderThreads = threads => (
        <View style={{ flexGrow: 0 }}>
            {threads.map((items, index) => (
                <BugList
                    key={`thread-${index}`}
                    bugs={items}
                    onDelete={removeBug}
                />
            ))}
        </View>
    )
    
    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 10,
                gap: 10,
            }}
        >

            <BugNavBar {...props} />
            
            <View style={{ flexGrow: 1 }}>
                {bugs.length
                    ? renderThreads(sortedThreads)
                    : (
                        <DefaultText
                            size={24}
                            style={{ lineHeight: 30 }}
                        >
                            No bugs to squash.
                        </DefaultText>
                    )
                }
            </View>

            <BugModal
                modal={bugModal}
                onCancel={closeBugModal}
                onSubmit={handleSubmit}
            />
                
        </View>
    )
}

export default BugContainer