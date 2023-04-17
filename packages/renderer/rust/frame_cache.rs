extern crate ffmpeg_next as remotionffmpeg;

pub struct FrameCacheItem {
    pub bitmap: Vec<u8>,
    pub resolved_pts: i64,
    pub resolved_dts: i64,
    pub asked_time: i64,
}

pub struct FrameCache {
    pub items: Vec<FrameCacheItem>,
}

impl FrameCache {
    pub fn new() -> Self {
        Self { items: Vec::new() }
    }
    pub fn add_item(&mut self, item: FrameCacheItem) {
        // TODO: This is weird with shifted PTS
        let exists = self.items.iter().any(|i| i.asked_time == item.asked_time);
        if exists {
            return;
        }

        self.items.push(item);
    }

    pub fn get_item(&self, time: i64) -> Option<Vec<u8>> {
        for i in 0..self.items.len() {
            let item = &self.items[i];
            if item.asked_time >= time && self.items.iter().any(|j| j.asked_time > item.asked_time)
            {
                return Some(item.bitmap.clone());
            }
        }
        return None;
    }
}
